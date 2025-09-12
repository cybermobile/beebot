import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  Task,
  Role,
  Prisma,
  TaskStatus,
  TaskType,
  TaskPriority,
  File,
} from '@prisma/client';
import { AddTaskMessageDto } from './dto/add-task-message.dto';
import { TaskMessageDto } from './dto/task-message.dto';
import { MessageContentBlock } from '@bytebot/shared';
import { TasksGateway } from './tasks.gateway';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    readonly prisma: PrismaService,
    @Inject(forwardRef(() => TasksGateway))
    private readonly tasksGateway: TasksGateway,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.logger.log('TasksService initialized');
  }

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    this.logger.log(
      `Creating new task with description: ${createTaskDto.description}`,
    );

    const task = await this.prisma.$transaction(async (prisma) => {
      // Create the task first
      this.logger.debug('Creating task record in database');
      const task = await prisma.task.create({
        data: {
          description: createTaskDto.description,
          type: createTaskDto.type || TaskType.IMMEDIATE,
          priority: createTaskDto.priority || TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          createdBy: createTaskDto.createdBy || Role.USER,
          model: createTaskDto.model,
          userId,
          ...(createTaskDto.scheduledFor
            ? { scheduledFor: createTaskDto.scheduledFor }
            : {}),
        },
      });
      this.logger.log(`Task created successfully with ID: ${task.id}`);

      let filesDescription = '';

      // Save files if provided
      if (createTaskDto.files && createTaskDto.files.length > 0) {
        this.logger.debug(
          `Saving ${createTaskDto.files.length} file(s) for task ID: ${task.id}`,
        );
        filesDescription += `\n`;

        const filePromises = createTaskDto.files.map((file) => {
          // Extract base64 data without the data URL prefix
          const base64Data = file.base64.includes('base64,')
            ? file.base64.split('base64,')[1]
            : file.base64;

          // Validate base64 format
          if (
            base64Data.length % 4 !== 0 ||
            !/^[A-Za-z0-9+/=]+$/.test(base64Data)
          ) {
            throw new BadRequestException(
              `Invalid base64 data for file ${file.name}`,
            );
          }

          const buffer = Buffer.from(base64Data, 'base64');

          const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
          if (buffer.length > MAX_FILE_SIZE) {
            throw new BadRequestException(
              `File ${file.name} exceeds the maximum allowed size of 10MB`,
            );
          }

          filesDescription += `\nFile ${file.name} written to desktop.`;

          return prisma.file.create({
            data: {
              name: file.name,
              type: file.type || 'application/octet-stream',
              size: buffer.length,
              data: buffer as any,
              taskId: task.id,
            },
          });
        });

        await Promise.all(filePromises);
        this.logger.debug(`Files saved successfully for task ID: ${task.id}`);
      }

      // Create the initial system message
      this.logger.debug(`Creating initial message for task ID: ${task.id}`);
      await prisma.message.create({
        data: {
          content: [
            {
              type: 'text',
              text: `${createTaskDto.description} ${filesDescription}`,
            },
          ] as Prisma.InputJsonValue,
          role: Role.USER,
          taskId: task.id,
        },
      });
      this.logger.debug(`Initial message created for task ID: ${task.id}`);

      return task;
    });

    this.tasksGateway.emitTaskCreated(task);

    return task;
  }

  async findScheduledTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        scheduledFor: {
          not: null,
        },
        queuedAt: null,
      },
      orderBy: [{ scheduledFor: 'asc' }],
    });
  }

  async findNextTask(): Promise<(Task & { files: File[] }) | null> {
    const task = await this.prisma.task.findFirst({
      where: {
        status: {
          in: [TaskStatus.RUNNING, TaskStatus.PENDING],
        },
      },
      orderBy: [
        { executedAt: 'asc' },
        { priority: 'desc' },
        { queuedAt: 'asc' },
        { createdAt: 'asc' },
      ],
      include: {
        files: true,
      },
    });

    if (task) {
      this.logger.log(
        `Found existing task with ID: ${task.id}, and status ${task.status}. Resuming.`,
      );
    }

    return task;
  }

  async findAll(
    page = 1,
    limit = 10,
    statuses?: string[],
    userId?: string,
  ): Promise<{ tasks: Task[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving tasks - page: ${page}, limit: ${limit}, statuses: ${statuses?.join(',')}`,
    );

    const skip = (page - 1) * limit;

    const whereClause: Prisma.TaskWhereInput = {
      ...(statuses && statuses.length > 0
        ? { status: { in: statuses as TaskStatus[] } }
        : {}),
      ...(userId ? { userId } : {}),
    };

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.task.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limit);
    this.logger.debug(`Retrieved ${tasks.length} tasks out of ${total} total`);

    return { tasks, total, totalPages };
  }

  async findById(id: string): Promise<Task> {
    this.logger.log(`Retrieving task by ID: ${id}`);

    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
        include: {
          files: true,
        },
      });

      if (!task) {
        this.logger.warn(`Task with ID: ${id} not found`);
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      this.logger.debug(`Retrieved task with ID: ${id}`);
      return task;
    } catch (error: any) {
      this.logger.error(`Error retrieving task ID: ${id} - ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  async findByIdForUser(id: string, userId: string): Promise<Task> {
    this.logger.log(`Retrieving task by ID: ${id} for user: ${userId}`);
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
      include: { files: true },
    });
    if (!task) {
      this.logger.warn(`Task with ID: ${id} not found for user`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    this.logger.log(`Updating task with ID: ${id}`);
    this.logger.debug(`Update data: ${JSON.stringify(updateTaskDto)}`);

    const existingTask = await this.findById(id);

    if (!existingTask) {
      this.logger.warn(`Task with ID: ${id} not found for update`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    let updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    if (updateTaskDto.status === TaskStatus.COMPLETED) {
      this.eventEmitter.emit('task.completed', { taskId: id });
    } else if (updateTaskDto.status === TaskStatus.NEEDS_HELP) {
      // Ensure task moves to user control and start input tracking
      try {
        const existing = await this.findById(id);
        if (existing.userId) {
          updatedTask = await this.takeOver(id, existing.userId);
        } else {
          // Fallback: set control to USER without ownership change
          updatedTask = await this.prisma.task.update({
            where: { id },
            data: { control: Role.USER },
          });
          this.eventEmitter.emit('task.takeover', { taskId: id });
          this.tasksGateway.emitTaskUpdate(id, updatedTask);
        }
      } catch (e) {
        this.logger.error('Failed to take over task in update', e);
      }
    } else if (updateTaskDto.status === TaskStatus.FAILED) {
      this.eventEmitter.emit('task.failed', { taskId: id });
    }

    this.logger.log(`Successfully updated task ID: ${id}`);
    this.logger.debug(`Updated task: ${JSON.stringify(updatedTask)}`);

    this.tasksGateway.emitTaskUpdate(id, updatedTask);

    return updatedTask;
  }

  async delete(id: string, userId: string): Promise<Task> {
    this.logger.log(`Deleting task with ID: ${id}`);

    // Ensure task belongs to user
    await this.findByIdForUser(id, userId);

    const deletedTask = await this.prisma.task.delete({
      where: { id },
    });

    this.logger.log(`Successfully deleted task ID: ${id}`);

    this.tasksGateway.emitTaskDeleted(id);

    return deletedTask;
  }

  async addTaskMessage(
    taskId: string,
    addTaskMessageDto: AddTaskMessageDto,
    userId: string,
  ): Promise<TaskMessageDto> {
    const task = await this.findByIdForUser(taskId, userId);
    if (!task) {
      this.logger.warn(`Task with ID: ${taskId} not found for guiding`);
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const message = await this.prisma.message.create({
      data: {
        content: [{ type: 'text', text: addTaskMessageDto.message }],
        role: Role.USER,
        taskId,
      },
    });

    this.tasksGateway.emitNewMessage(taskId, message);
    return {
      ...message,
      content: message.content as MessageContentBlock[],
    };
  }

  async resume(taskId: string, userId: string): Promise<Task> {
    this.logger.log(`Resuming task ID: ${taskId}`);

    const task = await this.findByIdForUser(taskId, userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (task.control !== Role.USER) {
      throw new BadRequestException(`Task ${taskId} is not under user control`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        control: Role.ASSISTANT,
        status: TaskStatus.RUNNING,
      },
    });

    try {
      await fetch(
        `${this.configService.get<string>('BYTEBOT_DESKTOP_BASE_URL')}/input-tracking/stop`,
        { method: 'POST' },
      );
    } catch (error) {
      this.logger.error('Failed to stop input tracking', error);
    }

    // Broadcast resume event so AgentProcessor can react
    this.eventEmitter.emit('task.resume', { taskId });

    this.logger.log(`Task ${taskId} resumed`);
    this.tasksGateway.emitTaskUpdate(taskId, updatedTask);

    return updatedTask;
  }

  async takeOver(taskId: string, userId: string): Promise<Task> {
    this.logger.log(`Taking over control for task ID: ${taskId}`);

    const task = await this.findByIdForUser(taskId, userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (task.control !== Role.ASSISTANT) {
      throw new BadRequestException(
        `Task ${taskId} is not under agent control`,
      );
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        control: Role.USER,
      },
    });

    try {
      await fetch(
        `${this.configService.get<string>('BYTEBOT_DESKTOP_BASE_URL')}/input-tracking/start`,
        { method: 'POST' },
      );
    } catch (error) {
      this.logger.error('Failed to start input tracking', error);
    }

    // Broadcast takeover event so AgentProcessor can react
    this.eventEmitter.emit('task.takeover', { taskId });

    this.logger.log(`Task ${taskId} takeover initiated`);
    this.tasksGateway.emitTaskUpdate(taskId, updatedTask);

    return updatedTask;
  }

  async cancel(taskId: string, userId: string): Promise<Task> {
    this.logger.log(`Cancelling task ID: ${taskId}`);

    const task = await this.findByIdForUser(taskId, userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (
      task.status === TaskStatus.COMPLETED ||
      task.status === TaskStatus.FAILED ||
      task.status === TaskStatus.CANCELLED
    ) {
      throw new BadRequestException(
        `Task ${taskId} is already completed, failed, or cancelled`,
      );
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: TaskStatus.CANCELLED,
      },
    });

    // Broadcast cancel event so AgentProcessor can cancel processing
    this.eventEmitter.emit('task.cancel', { taskId });

    this.logger.log(`Task ${taskId} cancelled and marked as failed`);
    this.tasksGateway.emitTaskUpdate(taskId, updatedTask);

    return updatedTask;
  }
}

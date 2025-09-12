import { BadRequestException } from '@nestjs/common';

jest.mock('@prisma/client', () => ({
  Prisma: {},
  PrismaClient: class {},
  TaskStatus: { PENDING: 'PENDING', RUNNING: 'RUNNING' },
  TaskType: { IMMEDIATE: 'IMMEDIATE' },
  TaskPriority: { MEDIUM: 'MEDIUM' },
  Role: { USER: 'USER', ASSISTANT: 'ASSISTANT' },
}));

import { TasksService } from './tasks.service';

describe('TasksService file handling', () => {
  let service: TasksService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      task: { create: jest.fn().mockResolvedValue({ id: 'task-id' }) },
      file: { create: jest.fn().mockResolvedValue({}) },
      message: { create: jest.fn().mockResolvedValue({}) },
      $transaction: jest.fn(async (cb) => cb(prisma)),
    };

    const tasksGateway = { emitTaskCreated: jest.fn() } as any;
    const configService = { get: jest.fn() } as any;
    const eventEmitter = { emit: jest.fn() } as any;

    service = new TasksService(prisma, tasksGateway, configService, eventEmitter);
  });

  it('saves valid base64 file as buffer', async () => {
    const buffer = Buffer.from('hello world');
    const dto: any = {
      description: 'test',
      files: [
        {
          name: 'hello.txt',
          base64: `data:text/plain;base64,${buffer.toString('base64')}`,
          type: 'text/plain',
          size: buffer.length,
        },
      ],
    };

    await service.create(dto, 'user-1');

    expect(prisma.file.create).toHaveBeenCalled();
    const call = prisma.file.create.mock.calls[0][0].data;
    expect(Buffer.isBuffer(call.data)).toBe(true);
    expect(call.size).toBe(buffer.length);
  });

  it('throws BadRequestException for oversized file', async () => {
    const buffer = Buffer.alloc(10 * 1024 * 1024 + 1);
    const dto: any = {
      description: 'test',
      files: [
        {
          name: 'big.bin',
          base64: buffer.toString('base64'),
          type: 'application/octet-stream',
          size: buffer.length,
        },
      ],
    };

    await expect(service.create(dto, 'user-1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('throws BadRequestException for invalid base64', async () => {
    const dto: any = {
      description: 'test',
      files: [
        {
          name: 'bad.bin',
          base64: '!!!!',
          type: 'application/octet-stream',
          size: 4,
        },
      ],
    };

    await expect(service.create(dto, 'user-1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});

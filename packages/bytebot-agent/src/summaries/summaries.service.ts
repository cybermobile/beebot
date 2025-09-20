import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    taskId: string;
    content: string;
    parentId?: string;
  }) {
    return (this.prisma as any).summary.create({
      data: {
        taskId: data.taskId,
        content: data.content,
        ...(data.parentId ? { parentId: data.parentId } : {}),
      },
    });
  }

  async findLatest(taskId: string) {
    return (this.prisma as any).summary.findFirst({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(taskId: string) {
    return (this.prisma as any).summary.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
    });
  }
}

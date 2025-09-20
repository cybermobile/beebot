import { Role } from '@prisma/client';
import { MessageContentBlock } from '@bytebot/shared';

export interface TaskMessageDto {
  id: string;
  content: MessageContentBlock[];
  role: Role;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
  summaryId?: string | null;
}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  async handleConnection(client: Socket) {
    try {
      const auth = client.handshake.auth as any;
      const headerAuth = client.handshake.headers['authorization'];
      let token: string | undefined = auth?.token;
      if (!token && typeof headerAuth === 'string' && headerAuth.startsWith('Bearer ')) {
        token = headerAuth.replace(/^Bearer\s+/i, '');
      }

      if (!token) {
        console.log('WS missing token, disconnecting');
        return client.disconnect();
      }

      const secretKey = process.env.CLERK_SECRET_KEY as string;
      const verified = await verifyToken(token, { secretKey });
      const clerkId = verified.sub;
      const email = (verified as any).email as string | undefined;

      // Upsert user in DB and attach id
      const user = await this.prisma.user.upsert({
        where: { clerkId },
        update: { email },
        create: { clerkId, email },
      });

      (client.data as any).userId = user.id;
      console.log(`Client connected: ${client.id} (user ${user.id})`);
    } catch (e) {
      console.log('WS token verification failed, disconnecting');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_task')
  async handleJoinTask(client: Socket, taskId: string) {
    try {
      const userId = (client.data as any).userId as string | undefined;
      if (!userId) return;
      const task = await this.prisma.task.findFirst({ where: { id: taskId, userId } });
      if (!task) {
        console.log(`Client ${client.id} unauthorized for task ${taskId}`);
        return;
      }
      client.join(`task_${taskId}`);
      console.log(`Client ${client.id} joined task ${taskId}`);
    } catch (e) {
      console.log('Error joining task room', e);
    }
  }

  @SubscribeMessage('leave_task')
  handleLeaveTask(client: Socket, taskId: string) {
    client.leave(`task_${taskId}`);
    console.log(`Client ${client.id} left task ${taskId}`);
  }

  emitTaskUpdate(taskId: string, task: any) {
    this.server.to(`task_${taskId}`).emit('task_updated', task);
  }

  emitNewMessage(taskId: string, message: any) {
    this.server.to(`task_${taskId}`).emit('new_message', message);
  }

  emitTaskCreated(task: any) {
    this.server.emit('task_created', task);
  }

  emitTaskDeleted(taskId: string) {
    this.server.emit('task_deleted', taskId);
  }
}

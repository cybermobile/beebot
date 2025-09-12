declare module '@prisma/client' {
  export namespace Prisma {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type InputJsonValue = any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type TaskWhereInput = any;
  }
  export const Prisma: any;
  export const TaskStatus: any;
  export type TaskStatus = any;
  export const TaskType: any;
  export type TaskType = any;
  export const TaskPriority: any;
  export type TaskPriority = any;
  export const Role: any;
  export type Role = any;
  export type Task = any;
  export type File = any;
  export class PrismaClient {
    $transaction: any;
    $connect: any;
    task: any;
    file: any;
    message: any;
    user: any;
  }
}

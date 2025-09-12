declare module '@prisma/client' {
  export interface Message {
    content: any;
    role: Role;
  }
  export enum Role {
    USER = 'USER',
    ASSISTANT = 'ASSISTANT',
  }
}

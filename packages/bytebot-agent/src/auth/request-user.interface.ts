import { Request } from 'express';

export interface RequestUser {
  id: string; // internal DB user id
  clerkId: string;
  email?: string;
}

export interface RequestWithUser extends Request {
  user?: RequestUser;
}

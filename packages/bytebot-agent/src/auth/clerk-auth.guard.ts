import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import { PrismaService } from '../prisma/prisma.service';
import { RequestWithUser } from './request-user.interface';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const authHeader = req.headers['authorization'];
    const token = (
      Array.isArray(authHeader) ? authHeader[0] : authHeader
    )?.replace(/^Bearer\s+/i, '');

    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new UnauthorizedException('Server missing CLERK_SECRET_KEY');
    }

    try {
      const verified = await verifyToken(token, { secretKey });
      const clerkId = verified.sub;
      const email = (verified as any).email as string | undefined;

      // Upsert user in DB
      const user = await this.prisma.user.upsert({
        where: { clerkId },
        update: { email },
        create: { clerkId, email },
      });

      req.user = { id: user.id, clerkId, email };

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

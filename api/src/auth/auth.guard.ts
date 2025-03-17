import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';
const COOKIE_NAME = 'jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies[COOKIE_NAME];
    if (!token) return false;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      (request as any).user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}

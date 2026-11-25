import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '../jwt/jwt.service.js';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromBearer(req);
    if (!token) throw new BadRequestException('Invalid authorization scheme');

    try {
      const payload = await this.jwtService.verify(token);
      req.user = payload;
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        throw new UnauthorizedException('Invalid token');
      }
      throw error;
    }

    return true;
  }

  private extractTokenFromBearer(req: Request): string | null {
    const [bearer, token] = req.headers.authorization?.split(' ') ?? [];
    return bearer === 'Bearer' && token ? token : null;
  }
}

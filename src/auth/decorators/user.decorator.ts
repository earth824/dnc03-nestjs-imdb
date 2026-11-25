import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessJwtPayload } from '../../jwt/jwt.service.js';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: keyof AccessJwtPayload, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user;
    if (!user) throw new Error('User decorator must be used with auth guard');
    return data ? user[data] : user;
  },
);

import 'express';
import { AccessJwtPayload } from '../jwt/jwt.service.ts';

declare module 'express' {
  interface Request {
    user?: AccessJwtPayload;
  }
}

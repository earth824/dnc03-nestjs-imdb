import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Role } from '../user/user.entity.js';

export type AccessJwtPayload = {
  id: number;
  email: string;
  role: Role;
};

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  sign(payload: AccessJwtPayload): Promise<string> {
    return this.nestJwtService.signAsync(payload);
  }

  verify(token: string): Promise<AccessJwtPayload> {
    return this.nestJwtService.verifyAsync(token);
  }
}

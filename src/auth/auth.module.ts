import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { HasherModule } from '../hasher/hasher.module.js';
import { JwtModule } from '../jwt/jwt.module.js';

@Module({
  imports: [UserModule, HasherModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

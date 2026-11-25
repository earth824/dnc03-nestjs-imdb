import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { AppConfigService } from '../config/app-config.service.js';
import { JwtService } from './jwt.service.js';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        secret: config.jwt.secret,
        signOptions: {
          expiresIn: config.jwt.expires,
        },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}

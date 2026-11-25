import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.schema.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  get db() {
    return {
      url: this.configService.get('DATABASE_URL', { infer: true }),
    };
  }

  get jwt() {
    return {
      secret: this.configService.get('JWT_SECRET', { infer: true }),
      expires: this.configService.get('JWT_EXPIRES_IN', { infer: true }),
    };
  }
}

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
}

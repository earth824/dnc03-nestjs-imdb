import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { AppConfigService } from '../config/app-config.service.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: AppConfigService) {
    const adapter = new PrismaPg({ connectionString: config.db.url });
    super({ adapter });
  }
}

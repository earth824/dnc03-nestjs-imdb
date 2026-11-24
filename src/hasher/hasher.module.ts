import { Module } from '@nestjs/common';
import { ArgonService } from './argon.service.js';

@Module({
  providers: [ArgonService],
  exports: [ArgonService],
})
export class HasherModule {}

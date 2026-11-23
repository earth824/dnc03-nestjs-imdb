import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller.js';

@Module({
  controllers: [MovieController]
})
export class MovieModule {}

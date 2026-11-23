import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller.js';
import { MovieReviewController } from './movie-review.controller.js';

@Module({
  controllers: [ReviewController, MovieReviewController]
})
export class ReviewModule {}

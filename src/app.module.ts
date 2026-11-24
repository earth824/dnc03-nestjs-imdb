import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { MovieModule } from './movie/movie.module.js';
import { ReviewModule } from './review/review.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MovieModule,
    ReviewModule,
    AppConfigModule,
    PrismaModule,
  ],
})
export class AppModule {}

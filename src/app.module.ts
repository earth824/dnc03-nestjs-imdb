import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { MovieModule } from './movie/movie.module.js';
import { ReviewModule } from './review/review.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard.js';
import { JwtModule } from './jwt/jwt.module.js';
import { RolesGuard } from './auth/roles.guard.js';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MovieModule,
    ReviewModule,
    AppConfigModule,
    PrismaModule,
    JwtModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

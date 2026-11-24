import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema.js';
import { AppConfigService } from './app-config.service.js';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

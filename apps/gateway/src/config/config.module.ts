import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { env } from './_env.loader';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validate: () => env,
    }),
  ],
})
export class AppConfigModule {}

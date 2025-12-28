import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module';
import { baseEnv } from './config/envs/base.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(baseEnv.appPort, '0.0.0.0');
}
bootstrap();

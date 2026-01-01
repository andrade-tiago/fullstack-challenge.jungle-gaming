import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { baseEnv } from './config/envs/base.env'
import { MicroserviceErrorInterceptor } from './interceptors/microservice-error.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new MicroserviceErrorInterceptor())

  await app.listen(baseEnv.appPort, '0.0.0.0')
}
bootstrap()

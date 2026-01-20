import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { Transport, type MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './modules/app.module'
import { baseEnv } from './config/env/base.env'
import { AppRpcExceptionFilter, RpcValidationPipe } from '@packages/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: baseEnv.appPort,
    },
  })

  app.useGlobalFilters(new AppRpcExceptionFilter())

  app.useGlobalPipes(new RpcValidationPipe())

  await app.listen()
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { Transport, type MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './modules/app.module'
import { baseEnv } from './config/envs/base.env'
import { ErrorToRpcExceptionFilter } from './filters/error-to-rpc-exception.filter'
import { RpcValidationPipe } from './pipes/rpc-validation.pipe'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: baseEnv.appPort,
    },
  })

  app.useGlobalFilters(new ErrorToRpcExceptionFilter())

  app.useGlobalPipes(new RpcValidationPipe())

  await app.listen()
}
bootstrap()

import { ValidationPipe } from '@nestjs/common'
import { AppRpcException } from '../errors/app-rpc-exception.error.js'
import { AppRpcExceptionType } from '../enums/app-errors.enum.js'

export class RpcValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      exceptionFactory: errors =>
        new AppRpcException({
          type: AppRpcExceptionType.BadRequest,
          message: 'Invalid data. See "details".',
          details: errors.map(err => ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
          })),
        }),
    })
  }
}

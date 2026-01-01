import { ValidationPipe } from '@nestjs/common'
import { AppRpcException, AppRpcExceptionType } from '@packages/types'

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

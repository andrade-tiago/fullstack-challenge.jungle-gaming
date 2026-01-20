import { Catch } from '@nestjs/common'
import { BaseRpcExceptionFilter } from '@nestjs/microservices'
import { AppRpcException } from '../errors/app-rpc-exception.error.js'
import { AppRpcExceptionType } from '../enums/app-errors.enum.js'

@Catch()
export class AppRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: any) {
    if (exception instanceof AppRpcException)
      return super.catch(exception, host)

    const rpcError = new AppRpcException({
      type: exception.type ?? AppRpcExceptionType.InternalServerError,
      message: exception.message || 'Internal server error.',
    })

    return super.catch(rpcError, host)
  }
}

import { Catch } from '@nestjs/common'
import { BaseRpcExceptionFilter } from '@nestjs/microservices'
import { AppRpcException, AppRpcExceptionType } from '@packages/types'

@Catch()
export class ErrorToRpcExceptionFilter extends BaseRpcExceptionFilter {
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

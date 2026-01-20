import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor } from '@nestjs/common'
import { AppRpcExceptionType, isAppRpcError } from '@packages/microservices'
import { catchError, throwError } from 'rxjs'

export class MicroserviceErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle()
      .pipe(
        catchError(error => {
          if (!isAppRpcError(error)) {
            return throwError(() => error)
          }

          const httpErrorDetails = this._toHttpErrorDetails(error)

          return throwError(() => new HttpException(
            httpErrorDetails,
            httpErrorDetails.statusCode,
          ))
        })
      )
  }

  private _toHttpErrorDetails(error: any): HttpErrorDetails {
    const handledError: HttpErrorDetails = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || 'An error ocurred.',
      details: error.details ?? null,
    }
    
    switch (error.type) {
      case AppRpcExceptionType.BadRequest:
        handledError.statusCode = HttpStatus.BAD_REQUEST
        break
      case AppRpcExceptionType.Conflict:
        handledError.statusCode = HttpStatus.CONFLICT
        break
      case AppRpcExceptionType.NotFound:
        handledError.statusCode = HttpStatus.NOT_FOUND
        break
      case AppRpcExceptionType.Unauthorized:
        handledError.statusCode = HttpStatus.UNAUTHORIZED
        break
    }
    return handledError
  }
}

type HttpErrorDetails = {
  statusCode: HttpStatus
  message: string
  details: any
}

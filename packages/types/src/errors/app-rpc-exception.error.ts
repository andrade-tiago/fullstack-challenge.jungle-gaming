import { RpcException } from '@nestjs/microservices'
import type { AppRpcExceptionType } from '../enums/index.js'

export type AppRpcExcpetionDetails = {
  type: AppRpcExceptionType
  message: string
  details?: any
}

export class AppRpcException extends RpcException {
  constructor(details: AppRpcExcpetionDetails) {
    super(details)
  }
}

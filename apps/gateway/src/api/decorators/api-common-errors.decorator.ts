import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse } from '@nestjs/swagger'

export function ApiCommonErrors() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Invalid request data',
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
    }),
  )
}

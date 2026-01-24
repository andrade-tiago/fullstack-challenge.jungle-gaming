import { applyDecorators, HttpStatus } from '@nestjs/common'
import { AuthenticatedUser } from '@packages/users'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse } from '@nestjs/swagger'

export function ApiGetAuthenticatedUser() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Get authenticated user',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'The authenticated user data',
      type: AuthenticatedUser,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Non-existent or invalid token',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

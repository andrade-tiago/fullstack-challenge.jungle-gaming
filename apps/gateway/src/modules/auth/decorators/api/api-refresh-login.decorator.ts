import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RefreshLoginResponseDTO } from '@packages/users'

export function ApiRefreshLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh access token',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Refreshed token successfully',
      type: RefreshLoginResponseDTO,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid or expired token',
    }),
  )
}

import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { LoginResponseDTO } from '@packages/users'

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login with user',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Logged in successfully',
      type: LoginResponseDTO,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

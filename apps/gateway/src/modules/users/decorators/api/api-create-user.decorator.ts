import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateUserResponseDTO } from '@packages/users'

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create an user',
    }),

    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User created successfully',
      type: CreateUserResponseDTO,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User with username or e-mail already exists',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

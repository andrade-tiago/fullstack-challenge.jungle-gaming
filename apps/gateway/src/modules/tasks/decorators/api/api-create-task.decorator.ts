import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateTaskResponseDTO } from '@packages/tasks'

export function ApiCreateTask() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Create a new task',
    }),

    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User created successfully',
      type: CreateTaskResponseDTO,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User with same email or username already exists',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

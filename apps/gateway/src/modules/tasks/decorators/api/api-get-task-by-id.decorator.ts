import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { TaskPublicDTO } from '@packages/tasks'

export function ApiGetTaskById() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Get a task by ID',
    }),

    ApiParam({
      name: 'id',
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Returned task',
      type: TaskPublicDTO,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Task not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

export function ApiDeleteTask() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Delete a task',
    }),

    ApiParam({
      name: 'id',
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Task deleted successfully'
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

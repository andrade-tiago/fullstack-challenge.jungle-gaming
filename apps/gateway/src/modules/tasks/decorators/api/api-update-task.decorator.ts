import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { TaskPublicDTO } from '@packages/tasks'

export function ApiUpdateTask() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Update a task',
    }),

    ApiParam({
      name: 'id',
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Task updated successfully',
      type: TaskPublicDTO,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Task not found',
    }),
  )
}

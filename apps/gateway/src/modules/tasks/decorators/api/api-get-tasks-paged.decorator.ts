import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ApiPagination } from '@packages/microservices'
import { TaskPublicDTO } from '@packages/tasks'

export function ApiGetTasksPaged() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Get all the tasks paged',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Paged tasks returned',
      type: ApiPagination(TaskPublicDTO),
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

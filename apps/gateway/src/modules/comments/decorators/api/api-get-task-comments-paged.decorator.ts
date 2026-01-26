import { ApiPagination } from '@/api'
import { applyDecorators, HttpStatus } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse } from '@nestjs/swagger'
import { CommentPublicDTO } from '@packages/tasks'

export function ApiGetTaskCommentsPaged() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Get all comments of a task paged',
    }),

    ApiParam({
      name: 'id',
      description: 'The task ID',
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Task comments returned',
      type: ApiPagination(CommentPublicDTO),
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Task not found',
    }),
  )
}

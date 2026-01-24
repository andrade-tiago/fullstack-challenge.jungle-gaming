import { applyDecorators, HttpStatus } from '@nestjs/common'
import { CreateCommentResponseDTO } from '@packages/tasks'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse } from '@nestjs/swagger'

export function ApiCreateComment() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({
      summary: 'Add a comment to a task',
    }),

    ApiParam({
      name: 'id',
      type: String,
      example: '2939f553-eb7b-4efb-b511-df14e0090d19',
    }),

    ApiResponse({
      status: HttpStatus.CREATED,
      type: CreateCommentResponseDTO,
      description: 'New task comment ID returned',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Task or user not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  )
}

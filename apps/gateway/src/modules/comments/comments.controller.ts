import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { CommentsService } from './comments.service'
import { ApiCreateComment, ApiGetTaskCommentsPaged } from './decorators/api'
import {
  CommentPublicDTO,
  CreateCommentRequestDTO,
  CreateCommentResponseDTO, 
  GetTaskCommentsPagedRequestDTO } from '@packages/tasks'
import { ApiCommonErrors } from '@/api/decorators'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { Pagination } from '@packages/types'

@ApiTags('Comments')
@ApiCommonErrors()
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(
    private readonly _commentsService: CommentsService,
  ) {}

  @Post('tasks/:id/comments')
  @ApiCreateComment()
  async create(
    @Param('id', ParseUUIDPipe) taskId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateCommentRequestDTO,
  )
    : Promise<CreateCommentResponseDTO>
  {
    const id = await this._commentsService
      .create({ taskId, userId, ...dto })

    return { id }
  }

  @Get('tasks/:id/comments')
  @ApiGetTaskCommentsPaged()
  async getTaskCommentsPaged(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Query() dto: GetTaskCommentsPagedRequestDTO,
  )
    : Promise<Pagination<CommentPublicDTO>>
  {
    return this._commentsService
      .getTaskCommentsPaged({ taskId, ...dto })
  }
}

import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { CommentsService } from './comments.service'
import { ApiCreateComment } from './decorators/api'
import {
  CreateCommentRequestDTO,
  CreateCommentResponseDTO } from '@packages/tasks'
import { ApiCommonErrors } from '@/api/decorators'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

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
  ) : Promise<CreateCommentResponseDTO>
  {
    const id = await this._commentsService.create({ taskId, userId, ...dto })

    return { id }
  }
}

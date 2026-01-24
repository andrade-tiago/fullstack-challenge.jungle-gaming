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
  CreateCommentDTO,
  CreateCommentResponseDTO } from '@packages/tasks'
import { ApiCommonErrors } from '@/api/decorators'

@ApiTags('Comments')
@ApiCommonErrors()
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(
    private readonly _commentsService: CommentsService,
  ) {}

  @Post('/tasks/:id/comments')
  @ApiCreateComment()
  async create(
    @Param('id', ParseUUIDPipe) taskId: string, 
    @Body() dto: CreateCommentDTO,
  ) : Promise<CreateCommentResponseDTO>
  {
    const id = await this._commentsService.create({ taskId, ...dto })

    return { id }
  }
}

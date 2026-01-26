import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CommentsService } from './comments.service'
import {
  CommentPublicDTO,
  CreateCommentCommandDTO,
  CreateCommentCommandResponseDTO,
  GetTaskCommentsPagedQueryDTO,
} from '@packages/tasks'
import { Pagination } from '@packages/types'

@Controller()
export class CommentsController {
  constructor(
    private readonly _commentsService: CommentsService,
  ) {}

  @MessagePattern({ cmd: 'comments.create' })
  async create(@Payload() dto: CreateCommentCommandDTO)
    : Promise<CreateCommentCommandResponseDTO>
  {
    const id = await this._commentsService.create({ ...dto })

    return { id }
  }

  @MessagePattern({ cmd: 'task.comments' })
  async getTaskCommentsPaged(
    @Payload() dto: GetTaskCommentsPagedQueryDTO,
  )
    : Promise<Pagination<CommentPublicDTO>>
  {
    return this._commentsService.getTaskCommentsPaged({ ...dto })
  }
}

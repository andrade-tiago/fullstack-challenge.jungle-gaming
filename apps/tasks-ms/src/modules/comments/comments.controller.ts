import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CommentsService } from './comments.service'
import {
  CreateCommentCommandDTO,
  CreateCommentResponseDTO,
} from '@packages/tasks'

@Controller('')
export class CommentsController {
  constructor(
    private readonly _commentsService: CommentsService,
  ) {}

  @MessagePattern({ cmd: 'comments.create' })
  async create(@Payload() commentData: CreateCommentCommandDTO)
    : Promise<CreateCommentResponseDTO>
  {
    const id = await this._commentsService.create(commentData)

    return { id }
  }
}

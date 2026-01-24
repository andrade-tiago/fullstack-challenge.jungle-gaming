import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CommentsService } from './comments.service'
import {
  CreateCommentCommandDTO,
  CreateCommentCommandResponseDTO,
} from '@packages/tasks'

@Controller()
export class CommentsController {
  constructor(
    private readonly _commentsService: CommentsService,
  ) {}

  @MessagePattern({ cmd: 'comments.create' })
  async create(@Payload() commentData: CreateCommentCommandDTO)
    : Promise<CreateCommentCommandResponseDTO>
  {
    const id = await this._commentsService.create(commentData)

    return { id }
  }
}

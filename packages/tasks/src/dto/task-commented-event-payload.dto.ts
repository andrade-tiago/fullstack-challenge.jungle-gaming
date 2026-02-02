import { IsUUID } from 'class-validator'
import { CreateCommentCommandDTO } from './create-comment-command.dto'

export class TaskCommentedEventPayloadDTO
  extends CreateCommentCommandDTO
{
  @IsUUID()
  commentId!: string
}

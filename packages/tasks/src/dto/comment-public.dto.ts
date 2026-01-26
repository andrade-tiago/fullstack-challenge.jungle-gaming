import { ApiProperty, OmitType } from '@nestjs/swagger'
import { CreateCommentCommandDTO } from './create-comment-command.dto'

export class CommentPublicDTO
  extends OmitType(CreateCommentCommandDTO, ['taskId'])
{
  @ApiProperty()
  id!: string

  @ApiProperty()
  declare content: string

  @ApiProperty()
  declare userId: string
}

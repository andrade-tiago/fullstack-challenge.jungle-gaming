import { ApiProperty } from '@nestjs/swagger'
import { CreateCommentCommandDTO } from './create-comment-command.dto'

export class CommentPublicDTO extends CreateCommentCommandDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  declare content: string

  @ApiProperty()
  declare taskId: string

  @ApiProperty()
  declare userId: string
}

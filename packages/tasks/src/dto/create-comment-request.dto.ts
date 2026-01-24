import { ApiProperty, OmitType } from '@nestjs/swagger'
import { CreateCommentCommandDTO } from './create-comment-command.dto'

export class CreateCommentRequestDTO
  extends OmitType(CreateCommentCommandDTO, ['taskId', 'userId'])
{
  @ApiProperty({
    example: 'For this, we will need the following materials: ...',
  })
  declare content: string
}

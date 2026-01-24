import { ApiProperty, PickType } from '@nestjs/swagger'
import { CreateCommentCommandDTO } from './create-comment-command.dto'

export class CreateCommentDTO extends
  PickType(CreateCommentCommandDTO, ['userId', 'content'])
{
  @ApiProperty({
    example: 'For this, we will need the following materials: ...',
  })
  declare content: string

  @ApiProperty({
    example: '2939f553-eb7b-4efb-b511-df14e0090d19',
  })
  declare userId: string
}

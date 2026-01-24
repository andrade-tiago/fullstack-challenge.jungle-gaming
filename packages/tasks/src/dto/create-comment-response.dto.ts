import { ApiProperty } from '@nestjs/swagger'
import { CreateCommentCommandResponseDTO } from './create-comment-command-response.dto'

export class CreateCommentResponseDTO extends CreateCommentCommandResponseDTO {
  @ApiProperty()
  declare id: string
}

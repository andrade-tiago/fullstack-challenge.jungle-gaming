import { ApiProperty } from '@nestjs/swagger'

export class CreateCommentResponseDTO {
  @ApiProperty()
  id!: string
}

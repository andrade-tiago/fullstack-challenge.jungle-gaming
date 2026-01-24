import { ApiProperty } from '@nestjs/swagger'
import { CreateUserCommandResponseDTO } from './create-user-command-response.dto'

export class CreateUserResponseDTO extends CreateUserCommandResponseDTO {
  @ApiProperty()
  declare id: string
}

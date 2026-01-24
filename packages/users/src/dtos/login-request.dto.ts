import { ApiProperty } from '@nestjs/swagger'
import { LoginCommandDTO } from './login-command.dto'

export class LoginRequestDTO extends LoginCommandDTO {
  @ApiProperty({
    example: 'foobar@email.com',
    description: 'User email address',
  })
  declare email: string

  @ApiProperty({
    example: 'Foobar#1234',
    description: 'User passowrd',
  })
  declare password: string
}

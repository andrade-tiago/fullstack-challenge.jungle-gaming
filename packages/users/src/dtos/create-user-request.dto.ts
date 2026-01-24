import { ApiProperty } from '@nestjs/swagger'
import { CreateUserCommandDTO } from './create-user-command.dto'

export class CreateUserRequestDTO extends CreateUserCommandDTO {
  @ApiProperty({
    example: 'Foo Bar',
    description: 'User full name',
  })
  declare username: string

  @ApiProperty({
    example: 'foobar@email.com',
    description: 'Unique valid user email',
  })
  declare email: string

  @ApiProperty({
    example: 'A_s7rOng-Pa\$\$w0rd',
    description: 'Password with at least 8 and one uppercase, lowercase, digit and symbol characters',
  })
  declare password: string
}

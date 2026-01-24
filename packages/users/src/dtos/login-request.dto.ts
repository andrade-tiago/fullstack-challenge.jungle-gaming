import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginRequestDTO {
  @ApiProperty({
    example: 'Foobar#1234',
    description: 'User passowrd',
  })
  @IsString()
  password!: string

  @ApiProperty({
    example: 'foobar@email.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string
}

import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength } from 'class-validator'
import { UsersContants } from '../constants'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserRequestDTO {
  @ApiProperty({
    example: 'FooBar_10',
    description: 'Unique username to identify the user',
  })
  @IsString()
  @MinLength(UsersContants.USERS_USERNAME_MIN_LENGTH)
  @MaxLength(UsersContants.USERS_USERNAME_MAX_LENGTH)
  @Matches(/^[A-Za-z0-9\_\-]+$/, {
    message: 'filed must contain only uppercase, lowercase, numbers and the symbols (_-)',
  })
  username!: string

  @ApiProperty({
    example: 'foobar@email.com',
    description: 'Unique valid user email',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    example: 'A_s7rOng-Pa\$\$w0rd',
    description: 'Password with at least 8 and one uppercase, lowercase, digit and symbol characters',
  })
  @IsStrongPassword({
    minLength: UsersContants.USERS_PASSWORD_MIN_LENGTH,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  },
  {
    message: 'password must contain at least one uppercase, lowercase, digit and symbol characters',
  })
  @MaxLength(UsersContants.USERS_PASSWORD_MAX_LENGTH)
  password!: string
}

import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength } from 'class-validator'
import { UsersConstants } from '../constants'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserRequestDTO {
  @ApiProperty({
    example: 'Foo Bar',
    description: 'User full name',
  })
  @IsString()
  @MinLength(UsersConstants.USERS_USERNAME_MIN_LENGTH)
  @MaxLength(UsersConstants.USERS_USERNAME_MAX_LENGTH)
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+( [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
    message: 'username must be a valid full name',
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
  @MinLength(UsersConstants.USERS_PASSWORD_MIN_LENGTH)
  @MaxLength(UsersConstants.USERS_PASSWORD_MAX_LENGTH)
  @IsStrongPassword({
    minLength: UsersConstants.USERS_PASSWORD_MIN_LENGTH,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  },
  {
    message: 'password must contain at least one uppercase, lowercase, digit and symbol characters',
  })
  password!: string
}

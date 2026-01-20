import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength } from 'class-validator'
import { UsersContants } from '../constants/index.js'

export class CreateUserRequestDTO {
  @IsString()
  @MinLength(UsersContants.USERS_USERNAME_MIN_LENGTH)
  @MaxLength(UsersContants.USERS_USERNAME_MAX_LENGTH)
  @Matches(/^[A-Za-z0-9\_\-]+$/, {
    message: 'filed must contain only uppercase, lowercase, numbers and the symbols (_-)',
  })
  username!: string

  @IsEmail()
  email!: string

  @IsStrongPassword({
    minLength: UsersContants.USERS_PASSWORD_MIN_LENGTH,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  },
  {
    message: 'password must contain at least one uppercase, lowercase, digit and symbol characteres',
  })
  @MaxLength(UsersContants.USERS_PASSWORD_MAX_LENGTH)
  password!: string
}

import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength } from 'class-validator'

export class CreateUserRequestDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[A-Za-z0-9\_\-]+$/, {
    message: 'filed must contain only uppercase, lowercase, numbers and the symbols (_-)',
  })
  username!: string

  @IsEmail()
  email!: string

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  },
  {
    message: 'password must contain at least one uppercase, lowercase, digit and symbol characteres',
  })
  @MaxLength(72) // Bcrypt limit.
  password!: string
}

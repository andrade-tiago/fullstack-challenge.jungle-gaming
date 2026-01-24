import { IsEmail, IsString } from 'class-validator'

export class LoginCommandDTO {
  @IsString()
  password!: string

  @IsEmail()
  email!: string
}

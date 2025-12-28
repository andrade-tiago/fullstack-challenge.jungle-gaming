import { IsEmail, IsOptional, IsString } from 'class-validator'

export class LoginRequestDTO {
  @IsString()
  password!: string
  
  @IsString()
  @IsOptional()
  username?: string

  @IsEmail()
  @IsOptional()
  email?: string
}

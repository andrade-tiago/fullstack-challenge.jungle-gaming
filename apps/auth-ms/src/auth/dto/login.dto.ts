import { IsEmail, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  password!: string;
  
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

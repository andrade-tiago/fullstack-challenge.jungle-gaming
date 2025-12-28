import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserRequestDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[A-Za-z0-9\_\-]+$/, {
    message: "Filed must contain only uppercase, lowercase, numbers and the symbols (_-).",
  })
  username!: string

  @IsEmail()
  email!: string

  @IsString()
  @MinLength(2)
  @MaxLength(72) // Bcrypt limit
  @Matches(/[A-Z]+/, { message: "Password must contain at least one uppercase character." })
  @Matches(/[a-z]+/, { message: "Password must contain at least one lowercase character." })
  @Matches(/[0-9]+/, { message: "Password must contain at least one numeric character." })
  @Matches(/[\!\@\#\$\%\.\-\_\+\?\*\&]+/, {
    message: "Password must contain at least one symbol character.",
  })
  password!: string
}

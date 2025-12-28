import { IsJWT } from 'class-validator'

export class RefreshLoginRequestDTO {
  @IsJWT()
  refreshToken!: string
}

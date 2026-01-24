import { IsJWT } from 'class-validator'

export class RefreshLoginCommandDTO {
  @IsJWT()
  refreshToken!: string
}

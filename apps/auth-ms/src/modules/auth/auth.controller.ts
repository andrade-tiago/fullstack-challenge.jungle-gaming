import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { LoginRequestDTO, RefreshLoginRequestDTO } from '@packages/users'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Payload() credentials: LoginRequestDTO) {
    return this._authService.login(credentials)
  }

  @MessagePattern({ cmd: 'auth.refresh' })
  async refresh(@Payload() credentials: RefreshLoginRequestDTO) {
    return this._authService.refreshToken(credentials.refreshToken)
  }
}

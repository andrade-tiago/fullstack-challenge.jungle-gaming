import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshLoginRequestDTO, 
  RefreshLoginResponseDTO } from '@packages/users'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Payload() credentials: LoginRequestDTO)
    : Promise<LoginResponseDTO>
  {
    return this._authService.login(credentials)
  }

  @MessagePattern({ cmd: 'auth.refresh' })
  async refresh(@Payload() credentials: RefreshLoginRequestDTO)
    : Promise<RefreshLoginResponseDTO>
  {
    return this._authService.refresh(credentials.refreshToken)
  }
}

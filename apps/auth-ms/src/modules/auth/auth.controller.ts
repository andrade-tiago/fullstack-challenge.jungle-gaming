import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import {
  LoginCommandDTO,
  LoginCommandResponseDTO,
  RefreshLoginCommandDTO, 
  RefreshLoginCommandResponseDTO } from '@packages/users'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Payload() credentials: LoginCommandDTO)
    : Promise<LoginCommandResponseDTO>
  {
    return this._authService.login(credentials)
  }

  @MessagePattern({ cmd: 'auth.refresh' })
  async refresh(@Payload() credentials: RefreshLoginCommandDTO)
    : Promise<RefreshLoginCommandResponseDTO>
  {
    return this._authService.refresh(credentials)
  }
}

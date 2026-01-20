import {
  Body,
  Controller,
  Logger,
  Post } from '@nestjs/common'
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

  @Post('login')
  async login(@Body() credentials: LoginRequestDTO)
    : Promise<LoginResponseDTO>
  {
    return this._authService.login(credentials)
  }

  @Post('refresh')
  async refresh(@Body() credentials: RefreshLoginRequestDTO)
    : Promise<RefreshLoginResponseDTO>
  {
    return this._authService.refresh(credentials.refreshToken)
  }
}

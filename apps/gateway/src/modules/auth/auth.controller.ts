import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post, 
  UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {
  AuthenticatedUser,
  LoginRequestDTO,
  LoginResponseDTO, 
  RefreshLoginRequestDTO,
  RefreshLoginResponseDTO } from '@packages/users'
import { JwtAuthGuard } from './guards/jwt.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import {
  ApiGetAuthenticatedUser,
  ApiLogin,
  ApiRefreshLogin } from './decorators/api'
import { ApiCommonErrors } from '@/api/decorators'

@ApiTags('Auth')
@ApiCommonErrors()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiLogin()
  async login(@Body() credentials: LoginRequestDTO)
    : Promise<LoginResponseDTO>
  {
    return this._authService.login(credentials)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiRefreshLogin()
  async refresh(@Body() credentials: RefreshLoginRequestDTO)
    : Promise<RefreshLoginResponseDTO>
  {
    return this._authService.refresh(credentials.refreshToken)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiGetAuthenticatedUser()
  async getAuthenticatedUser(
    @CurrentUser() user: AuthenticatedUser,
  ) : Promise<AuthenticatedUser>
  {
    return user
  }
}

import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
  ) {}

  @MessagePattern('auth.register')
  async register(@Payload() dto: RegisterDto) {
    const user = await this._authService.register(dto);

    Logger.log(user, 'Register');

    return { id: user.id };
  }

  @MessagePattern('auth.login')
  async login(@Payload() dto: LoginDto) {
    return this._authService.login(dto);
  }

  @MessagePattern('auth.refresh')
  async refresh(@Payload() dto: RefreshDto) {
    return this._authService.refreshToken(dto.refreshToken);
  }
}

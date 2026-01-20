import { Module } from '@nestjs/common'
import { JwtConfigProvider } from './jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AppClientsModule } from '../clients/clients.module'

@Module({
  imports: [
    AppClientsModule,
  ],
  providers: [
    AuthService,
    JwtConfigProvider,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

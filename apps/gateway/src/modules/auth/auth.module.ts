import { Module } from '@nestjs/common'
import { JwtConfigProvider } from './jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  providers: [JwtConfigProvider, JwtStrategy],
})
export class AuthModule {}

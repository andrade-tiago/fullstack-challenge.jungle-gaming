import { Inject, Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import type { JwtPayloadDTO } from '@packages/users'
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import type { JwtEnv } from '@/config/envs/jwt.env';
import { JWT_CONFIG } from '../jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JWT_CONFIG)
    jwtConfig: JwtEnv,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessSecret,
    })
  }

  validate(payload: JwtPayloadDTO): AuthenticatedUser {
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
    }
  }
}

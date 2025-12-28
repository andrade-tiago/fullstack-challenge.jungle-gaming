import { type JwtEnv, jwtEnv } from '@/config/envs/jwt.env'
import { Provider } from '@nestjs/common'

export const JWT_CONFIG = Symbol('JWT_PROVIDER')

export const JwtConfigProvider: Provider<JwtEnv> = {
  provide: JWT_CONFIG,
  useValue: jwtEnv,
}

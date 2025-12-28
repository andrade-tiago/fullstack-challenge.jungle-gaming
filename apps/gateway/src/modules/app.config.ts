import { type BaseEnv, baseEnv } from '@/config/envs/base.env'
import { Provider } from '@nestjs/common'

export const APP_CONFIG = Symbol('APP_CONFIG')

export const AppConfigProvider: Provider<BaseEnv> = {
  provide: APP_CONFIG,
  useValue: baseEnv,
}

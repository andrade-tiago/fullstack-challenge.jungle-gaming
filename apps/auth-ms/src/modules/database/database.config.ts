import { type DbEnv, dbEnv } from '@/config/envs/db.env'
import { Provider } from '@nestjs/common'

export const DATABASE_CONFIG = Symbol('DATABASE_CONFIG')

export const DatabaseConfigProvider: Provider<DbEnv> = {
  provide: DATABASE_CONFIG,
  useValue: dbEnv,
}

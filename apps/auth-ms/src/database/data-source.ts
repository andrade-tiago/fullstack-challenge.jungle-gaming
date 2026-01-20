import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { dbEnv } from '@/config/envs/db.env'
import { baseEnv } from '@/config/envs/base.env'

const envIsProduction = baseEnv.env === 'production'

const entitiesPath = envIsProduction
  ? 'dist/entities/*.entity.js'
  : 'src/entities/*.entity.ts'

const migrationsPath = envIsProduction
  ? 'dist/database/migrations/*.js'
  : 'src/database/migrations/*.ts'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbEnv.dbHost,
  port: dbEnv.dbPort,
  username: dbEnv.dbUser,
  password: dbEnv.dbPassword,
  database: dbEnv.dbName,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  synchronize: false,
})

export { AppDataSource }

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { dbEnv } from '@/config/envs/db.env'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbEnv.dbHost,
  port: dbEnv.dbPort,
  username: dbEnv.dbUser,
  password: dbEnv.dbPassword,
  database: dbEnv.dbName,
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
})

export {
  AppDataSource,
}

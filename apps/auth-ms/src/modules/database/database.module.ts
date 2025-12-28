import { AppDataSource } from '@/database/data-source'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfigProvider } from './database.config'

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...AppDataSource.options })
  ],
  providers: [DatabaseConfigProvider],
  exports: [DatabaseConfigProvider],
})
export class DatabaseModule {}

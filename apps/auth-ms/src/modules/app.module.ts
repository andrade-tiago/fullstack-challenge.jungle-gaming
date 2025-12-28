import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { CommonModule } from './common/common.module'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { AppConfigProvider } from './app.config'

@Module({
  imports: [
    AuthModule,
    CommonModule,
    DatabaseModule,
    UsersModule,
  ],
  providers: [AppConfigProvider],
  exports: [AppConfigProvider],
})
export class AppModule {}

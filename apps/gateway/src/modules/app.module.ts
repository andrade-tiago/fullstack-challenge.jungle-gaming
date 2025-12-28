import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { AppClientsModule } from './clients/clients.module'
import { AppConfigProvider } from './app.config'

@Module({
  imports: [
    AppClientsModule,
    UsersModule,
  ],
  providers: [AppConfigProvider],
  exports: [AppConfigProvider],
  controllers: [AppController],
})
export class AppModule {}

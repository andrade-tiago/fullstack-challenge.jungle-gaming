import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { AppClientsModule } from './clients/clients.module'
import { AppConfigProvider } from './app.config'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'
import { CommentsModule } from './comments/comments.module'

@Module({
  imports: [
    AppClientsModule,
    AuthModule,
    CommentsModule,
    TasksModule,
    UsersModule,
  ],
  providers: [AppConfigProvider],
  exports: [AppConfigProvider],
  controllers: [AppController],
})
export class AppModule {}

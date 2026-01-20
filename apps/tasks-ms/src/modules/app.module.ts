import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { ClientsModule } from './clients/clients.module'
import { TasksModule } from './tasks/tasks.module'
import { CommentsModule } from './comments/comments.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ClientsModule,
    CommentsModule,
    DatabaseModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}

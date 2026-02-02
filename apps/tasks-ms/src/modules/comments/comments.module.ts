import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from '@/entities/comment.entity'
import { Task } from '@/entities/task.entity'
import { UsersModule } from '../users/users.module'
import { CommentsMapper } from './comments.mapper'
import { ClientsModule } from '../clients/clients.module'

@Module({
  imports: [
    ClientsModule,
    TypeOrmModule.forFeature([ Comment, Task ]),
    UsersModule,
  ],
  providers: [CommentsService, CommentsMapper],
  controllers: [CommentsController],
})
export class CommentsModule {}

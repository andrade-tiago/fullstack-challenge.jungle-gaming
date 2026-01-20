import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '@/entities/task.entity'
import { TaskAssignment } from '@/entities/task-assignment.entity'
import { TasksMapper } from './tasks.mapper'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { ClientsModule } from '../clients/clients.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    ClientsModule,
    TypeOrmModule.forFeature([ Task, TaskAssignment ]),
    UsersModule,
  ],
  providers: [
    TasksMapper,
    TasksService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}

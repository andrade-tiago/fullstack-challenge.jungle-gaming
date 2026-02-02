import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksMapper } from './tasks.mapper'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { ClientsModule } from '../clients/clients.module'
import { UsersModule } from '../users/users.module'
import { Task, TaskAssignment, TaskAuditLogs } from '@/entities'
import { TaskLogsService } from './logs/task-logs.service'

@Module({
  imports: [
    ClientsModule,
    TypeOrmModule.forFeature([
      Task,
      TaskAssignment,
      TaskAuditLogs,
    ]),
    UsersModule,
  ],
  providers: [
    TasksMapper,
    TasksService,
    TaskLogsService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}

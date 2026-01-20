import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { AppClientsModule } from '../clients/clients.module'

@Module({
  imports: [AppClientsModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

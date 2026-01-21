import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { TasksService } from './tasks.service'
import {
  CreateTaskCommandDTO,
  CreateTaskResponseDTO,
  GetTaskByIdQueryDTO,
  GetTasksPagedQueryDTO,
  TaskPublicDTO, 
  UpdateTaskCommandDTO} from '@packages/tasks'
import type { Pagination } from '@packages/types'

@Controller()
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
  ) {}

  @MessagePattern({ cmd: 'tasks.create' })
  async create(@Payload() taskData: CreateTaskCommandDTO)
    : Promise<CreateTaskResponseDTO>
  {
    const id = await this._tasksService.create(taskData)
    return { id }
  }

  @MessagePattern({ cmd: 'tasks.get-by-id' })
  async getById(@Payload() query: GetTaskByIdQueryDTO)
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById(query.id)
  }

  @MessagePattern({ cmd: 'tasks.get-paged' })
  async getPaged(@Payload() query: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged(query)
  }

  @MessagePattern({ cmd: 'tasks.update' })
  async update(@Payload() command: UpdateTaskCommandDTO)
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.update(command)
  }
}

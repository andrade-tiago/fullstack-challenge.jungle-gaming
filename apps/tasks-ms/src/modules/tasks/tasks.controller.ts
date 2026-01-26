import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { TasksService } from './tasks.service'
import {
  CreateTaskCommandDTO,
  CreateTaskCommandResponseDTO,
  DeleteTaskCommandDTO,
  GetTaskByIdQueryDTO,
  GetTasksPagedQueryDTO,
  TaskPublicDTO, 
  UpdateTaskCommandDTO } from '@packages/tasks'
import type { Pagination } from '@packages/types'

@Controller()
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
  ) {}

  @MessagePattern({ cmd: 'tasks.create' })
  async create(@Payload() dto: CreateTaskCommandDTO)
    : Promise<CreateTaskCommandResponseDTO>
  {
    const id = await this._tasksService.create({ ...dto })
    return { id }
  }

  @MessagePattern({ cmd: 'tasks.get-by-id' })
  async getById(@Payload() dto: GetTaskByIdQueryDTO)
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById({ ...dto })
  }

  @MessagePattern({ cmd: 'tasks.get-paged' })
  async getPaged(@Payload() dto: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged({ ...dto })
  }

  @MessagePattern({ cmd: 'tasks.update' })
  async update(@Payload() dto: UpdateTaskCommandDTO)
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.update({ ...dto })
  }

  @MessagePattern({ cmd: 'tasks.delete' })
  async delete(@Payload() dto: DeleteTaskCommandDTO)
    : Promise<void>
  {
    return this._tasksService.delete({ ...dto })
  }
}

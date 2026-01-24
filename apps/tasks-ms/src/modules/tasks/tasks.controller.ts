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
  async create(@Payload() taskData: CreateTaskCommandDTO)
    : Promise<CreateTaskCommandResponseDTO>
  {
    const id = await this._tasksService.create(taskData)
    return { id }
  }

  @MessagePattern({ cmd: 'tasks.get-by-id' })
  async getById(@Payload() { id }: GetTaskByIdQueryDTO)
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById({ id })
  }

  @MessagePattern({ cmd: 'tasks.get-paged' })
  async getPaged(@Payload() dto: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged({ ...dto })
  }

  @MessagePattern({ cmd: 'tasks.update' })
  async update(@Payload() command: UpdateTaskCommandDTO)
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.update(command)
  }

  @MessagePattern({ cmd: 'tasks.delete' })
  async delete(@Payload() { id }: DeleteTaskCommandDTO)
    : Promise<void>
  {
    return this._tasksService.delete({ id })
  }
}

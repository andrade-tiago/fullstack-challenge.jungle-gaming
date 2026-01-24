import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { TASKS_CLIENT } from '../clients/clients/tasks.client'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import type { Pagination } from '@packages/types'
import type {
  CreateTaskCommandDTO,
  CreateTaskCommandResponseDTO,
  DeleteTaskCommandDTO,
  GetTaskByIdQueryDTO,
  GetTasksPagedQueryDTO,
  TaskPublicDTO, 
  UpdateTaskCommandDTO } from '@packages/tasks'

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASKS_CLIENT)
    private readonly _tasksClient: ClientProxy,
  ) {}

  async create(dto: CreateTaskCommandDTO)
    : Promise<TaskPublicDTO['id']>
  {
    const createTask$ = this._tasksClient
      .send<CreateTaskCommandResponseDTO>({ cmd: 'tasks.create' }, dto)

    const createTaskResponse = await firstValueFrom(createTask$)

    return createTaskResponse.id
  }

  async getById(dto: GetTaskByIdQueryDTO)
    : Promise<TaskPublicDTO>
  {
    const getTaskById$ = this._tasksClient
      .send<TaskPublicDTO>({ cmd: 'tasks.get-by-id' }, dto)
    
    return firstValueFrom(getTaskById$)
  }

  async getPaged(dto: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    const getTasksPaged$ = this._tasksClient
      .send<Pagination<TaskPublicDTO>>({ cmd: 'tasks.get-paged' }, dto)
    
    return firstValueFrom(getTasksPaged$)
  }

  async update(dto: UpdateTaskCommandDTO)
    : Promise<TaskPublicDTO>
  {
    const updateTask$ = this._tasksClient
      .send<TaskPublicDTO>({ cmd: 'tasks.update' }, dto)

    return firstValueFrom(updateTask$)
  }

  async delete(dto: DeleteTaskCommandDTO)
    : Promise<void>
  {
    const deleteTask$ = this._tasksClient
      .send<void>({ cmd: 'tasks.delete' }, dto)

    lastValueFrom(deleteTask$, { defaultValue: undefined })
  }
}

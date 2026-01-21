import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { TASKS_CLIENT } from '../clients/clients/tasks.client'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import type {
  TaskPublicDTO,
  CreateTaskCommandDTO, 
  CreateTaskResponseDTO,
  GetTaskByIdQueryDTO,
  GetTasksPagedQueryDTO, 
  UpdateTaskCommandDTO,
  DeleteTaskCommandDTO} from '@packages/tasks'
import type { Pagination } from '@packages/types'

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASKS_CLIENT)
    private readonly _tasksClient: ClientProxy,
  ) {}

  async create(taskData: CreateTaskCommandDTO)
    : Promise<TaskPublicDTO['id']>
  {
    const createTask$ = this._tasksClient
      .send<CreateTaskResponseDTO>({ cmd: 'tasks.create' }, taskData)

    const createTaskResponse = await firstValueFrom(createTask$)

    return createTaskResponse.id
  }

  async getById(id: TaskPublicDTO['id'])
    : Promise<TaskPublicDTO>
  {
    const getTaskById$ = this._tasksClient
      .send<TaskPublicDTO, GetTaskByIdQueryDTO>(
        { cmd: 'tasks.get-by-id' },
        { id })
    
    return firstValueFrom(getTaskById$)
  }

  async getPaged(query: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    const getTasksPaged$ = this._tasksClient
      .send<Pagination<TaskPublicDTO>>({ cmd: 'tasks.get-paged' }, query)
    
    return firstValueFrom(getTasksPaged$)
  }

  async update(command: UpdateTaskCommandDTO)
    : Promise<TaskPublicDTO>
  {
    const updateTask$ = this._tasksClient
      .send<TaskPublicDTO>({ cmd: 'tasks.update' }, command)

    return firstValueFrom(updateTask$)
  }

  async delete(command: DeleteTaskCommandDTO)
    : Promise<void>
  {
    const deleteTask$ = this._tasksClient
      .send<void>({ cmd: 'tasks.delete' }, command)

    lastValueFrom(deleteTask$, { defaultValue: undefined })
  }
}

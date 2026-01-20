import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query } from '@nestjs/common'
import {
  CreateTaskCommandDTO,
  CreateTaskResponseDTO, 
  GetTasksPagedQueryDTO, 
  TaskPublicDTO } from '@packages/tasks'
import { TasksService } from './tasks.service'
import type { Pagination } from '@packages/types'

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
  ) {}

  @Post()
  async create(@Body() taskData: CreateTaskCommandDTO)
    : Promise<CreateTaskResponseDTO>
  {
    const id = await this._tasksService.create(taskData)
    return { id }
  }

  @Get(':id')
  async getById(@Param('id') id: TaskPublicDTO['id'])
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById(id)
  }

  @Get()
  async getPaged(@Query() query: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged(query)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query } from '@nestjs/common'
import {
  CreateTaskCommandDTO,
  CreateTaskResponseDTO, 
  GetTasksPagedQueryDTO, 
  TaskPublicDTO, 
  UpdateTaskDTO } from '@packages/tasks'
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
  async getById(
    @Param('id', ParseUUIDPipe) id: TaskPublicDTO['id']
  ) : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById(id)
  }

  @Get()
  async getPaged(@Query() query: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged(query)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskDTO,
  ) : Promise<TaskPublicDTO>
  {
    return this._tasksService.update({ id, ...dto })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ) : Promise<void>
  {
    return this._tasksService.delete({ id })
  }
}

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
  Query, 
  UseGuards } from '@nestjs/common'
import {
  CreateTaskCommandDTO,
  CreateTaskResponseDTO,
  GetTasksPagedQueryDTO,
  TaskPublicDTO,
  UpdateTaskDTO } from '@packages/tasks'
import { TasksService } from './tasks.service'
import { ApiTags } from '@nestjs/swagger'
import {
  ApiCreateTask,
  ApiDeleteTask,
  ApiGetTaskById,
  ApiGetTasksPaged, 
  ApiUpdateTask } from './decorators/api'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import type { Pagination } from '@packages/types'

@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateTask()
  async create(@Body() taskData: CreateTaskCommandDTO)
    : Promise<CreateTaskResponseDTO>
  {
    const id = await this._tasksService.create(taskData)
    return { id }
  }

  @Get(':id')
  @ApiGetTaskById()
  async getById(
    @Param('id', ParseUUIDPipe) id: TaskPublicDTO['id'],
  ) : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById(id)
  }

  @Get()
  @ApiGetTasksPaged()
  async getPaged(@Query() query: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged(query)
  }

  @Patch(':id')
  @ApiUpdateTask()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskDTO,
  ) : Promise<TaskPublicDTO>
  {
    return this._tasksService.update({ id, ...dto })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteTask()
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ) : Promise<void>
  {
    return this._tasksService.delete({ id })
  }
}

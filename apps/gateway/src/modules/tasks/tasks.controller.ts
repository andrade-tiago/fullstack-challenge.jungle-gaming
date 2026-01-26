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
import { TasksService } from './tasks.service'
import { ApiTags } from '@nestjs/swagger'
import {
  ApiCreateTask,
  ApiDeleteTask,
  ApiGetTaskById,
  ApiGetTasksPaged, 
  ApiUpdateTask } from './decorators/api'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { ApiCommonErrors } from '@/api/decorators'
import {
  CreateTaskRequestDTO,
  CreateTaskResponseDTO, 
  GetTasksPagedRequestDTO, 
  TaskPublicDTO, 
  UpdateTaskRequestDTO } from '@packages/tasks'
import type { Pagination } from '@packages/types'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

@ApiTags('Tasks')
@ApiCommonErrors()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
  ) {}

  @Post()
  @ApiCreateTask()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateTaskRequestDTO,
  )
    : Promise<CreateTaskResponseDTO>
  {
    const id = await this._tasksService.create({ ...dto, userId })
    return { id }
  }

  @Get(':id')
  @ApiGetTaskById()
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ) : Promise<TaskPublicDTO>
  {
    return this._tasksService.getById({ id })
  }

  @Get()
  @ApiGetTasksPaged()
  async getPaged(@Query() dto: GetTasksPagedRequestDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    return this._tasksService.getPaged({ ...dto })
  }

  @Patch(':id')
  @ApiUpdateTask()
  async update(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskRequestDTO,
  )
    : Promise<TaskPublicDTO>
  {
    return this._tasksService.update({ id, userId, ...dto })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteTask()
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  )
    : Promise<void>
  {
    return this._tasksService.delete({ id, userId })
  }
}

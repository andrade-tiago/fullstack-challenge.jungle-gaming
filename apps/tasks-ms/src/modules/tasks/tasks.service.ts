import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { TasksMapper } from './tasks.mapper'
import { Pagination } from '@packages/types'
import {
  AppRpcException,
  AppRpcExceptionType } from '@packages/microservices'
import { UsersService } from '../users/users.service'
import { LogAction, Task, TaskAssignment } from '@/entities'
import type {
  CreateTaskCommandDTO,
  DeleteTaskCommandDTO,
  GetTaskByIdQueryDTO,
  GetTasksPagedQueryDTO,
  TaskPublicDTO,
  UpdateTaskCommandDTO } from '@packages/tasks'
import { TaskLogsService } from './logs/task-logs.service'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly _tasksRepository: Repository<Task>,

    @InjectRepository(TaskAssignment)
    private readonly _assignmentsRepository: Repository<TaskAssignment>,

    private readonly _tasksMapper: TasksMapper,
    private readonly _usersService: UsersService,
    private readonly _taskLogsService: TaskLogsService,
  ) {}

  public async create({ userId, ...taskData }: CreateTaskCommandDTO)
    : Promise<TaskPublicDTO['id']>
  {
    await this._usersService.throwIfAnyUserIdIsInvalid(taskData.userIds)

    const newTask = this._tasksRepository.create({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      deadline: taskData.deadline,
    })
    newTask.assignments = taskData.userIds.map(userId => 
      this._assignmentsRepository.create({ userId })
    )
    await this._tasksRepository.save(newTask)

    await this._taskLogsService.log({
      action: LogAction.CREATE,
      metadata: taskData,
      taskId: newTask.id,
      userId,
    })

    return newTask.id
  }

  public async getById({ id }: GetTaskByIdQueryDTO)
    : Promise<TaskPublicDTO>
  {
    const task = await this._tasksRepository.findOneBy({ id })

    if (!task)
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'Task with id not found.'
      })
    
    return this._tasksMapper.toPublicDTO(task)
  }

  public async getPaged(dto: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    const takeCount = dto.pageSize
    const skipCount = (dto.pageNumber - 1) * takeCount

    const [tasks, tasksTotalCount] = await Promise.all([
      this._tasksRepository.find({
        skip: skipCount,
        take: takeCount,
      }),
      this._tasksRepository.count()
    ])
    const taskPublics = tasks.map(this._tasksMapper.toPublicDTO)

    return new Pagination({
      data: taskPublics,
      pageNumber: dto.pageNumber,
      pageSize: dto.pageSize,
      totalCount: tasksTotalCount,
    })
  }

  public async update(
    { id, userId, ...taskData }: UpdateTaskCommandDTO,
  )
    : Promise<TaskPublicDTO>
  {
    const task = await this._tasksRepository.findOneBy({ id })
    if (!task) {
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'Task with ID not found.',
      })
    }

    this._tasksRepository.merge(task, taskData)
    await this._tasksRepository.save(task)

    await this._taskLogsService.log({
      action: LogAction.UPDATE,
      taskId: id,
      metadata: taskData,
      userId,
    })

    return this._tasksMapper.toPublicDTO(task)
  }

  public async delete({ id, userId }: DeleteTaskCommandDTO)
    : Promise<void>
  {
    const result = await this._tasksRepository.delete(id)

    if (result.affected === 0) {
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'Task with ID not found.',
      })
    }

    await this._taskLogsService.log({
      action: LogAction.DELETE,
      taskId: id,
      userId,
    })
  }
}

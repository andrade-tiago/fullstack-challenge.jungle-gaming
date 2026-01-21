import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Task } from '@/entities/task.entity'
import { TaskAssignment } from '@/entities/task-assignment.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TasksMapper } from './tasks.mapper'
import { Pagination } from '@packages/types'
import {
  AppRpcException,
  AppRpcExceptionType } from '@packages/microservices'
import { UsersService } from '../users/users.service'
import type {
  CreateTaskCommandDTO,
  GetTasksPagedQueryDTO,
  TaskPublicDTO,
  UpdateTaskCommandDTO } from '@packages/tasks'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly _tasksRepository: Repository<Task>,

    @InjectRepository(TaskAssignment)
    private readonly _taskAssignmentsRepository: Repository<TaskAssignment>,

    private readonly _tasksMapper: TasksMapper,
    private readonly _usersService: UsersService,
  ) {}

  public async create(dto: CreateTaskCommandDTO)
    : Promise<Task['id']>
  {
    await this._usersService.throwIfAnyUserIdIsInvalid(dto.userIds)

    const newTask = this._tasksRepository.create({
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      status: dto.status,
      deadline: dto.deadline,
    })

    newTask.assignments = dto.userIds.map(userId => 
      this._taskAssignmentsRepository.create({ userId })
    )

    const createdTask = await this._tasksRepository.save(newTask)
    return createdTask.id
  }

  public async getById(id: Task['id'])
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

  public async getPaged(query: GetTasksPagedQueryDTO)
    : Promise<Pagination<TaskPublicDTO>>
  {
    const takeCount = query.pageSize
    const skipCount = (query.pageNumber - 1) * takeCount

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
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: tasksTotalCount,
    })
  }

  public async update({ id, ...dto }: UpdateTaskCommandDTO)
    : Promise<TaskPublicDTO>
  {
    const task = await this._tasksRepository.findOneBy({ id })

    if (!task) {
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'Task with ID not found.',
      })
    }

    const updatedTask = this._tasksRepository.merge(task, dto)
    const savedTask = await this._tasksRepository.save(updatedTask)

    return this._tasksMapper.toPublicDTO(savedTask)
  }
}

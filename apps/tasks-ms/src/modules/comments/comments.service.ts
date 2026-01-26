import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from '@/entities/comment.entity'
import { Task } from '@/entities/task.entity'
import { UsersService } from '../users/users.service'
import { AppRpcException, AppRpcExceptionType } from '@packages/microservices'
import { CommentsMapper } from './comments.mapper'
import type {
  CommentPublicDTO,
  CreateCommentCommandDTO,
  GetTaskCommentsPagedQueryDTO } from '@packages/tasks'
import { Pagination } from '@packages/types'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly _commentsRepository: Repository<Comment>,

    @InjectRepository(Task)
    private readonly _tasksRepository: Repository<Task>,

    private readonly _usersService: UsersService,
    private readonly _commentsMapper: CommentsMapper,
  ) {}

  async create(dto: CreateCommentCommandDTO)
    : Promise<Comment['id']>
  {
    await this._usersService.throwIfAnyUserIdIsInvalid([ dto.userId ])
    await this._throwIfTaskNotExists(dto.taskId)

    const newComment = this._commentsRepository.create({
      task: { id: dto.taskId },
      content: dto.content,
      userId: dto.userId,
    })

    const createdComment = await this._commentsRepository.save(newComment)

    return createdComment.id
  }

  async getTaskCommentsPaged(
    dto: GetTaskCommentsPagedQueryDTO,
  )
    : Promise<Pagination<CommentPublicDTO>>
  {
    await this._throwIfTaskNotExists(dto.taskId)

    const takeTotal = dto.pageSize
    const skipTotal = (dto.pageNumber - 1) * takeTotal

    const [totalTaskComments, comments] = await Promise.all([
      this._commentsRepository.countBy({ taskId: dto.taskId }),
      this._commentsRepository.find({
        where: { taskId: dto.taskId },
        order: { createdAt: 'DESC' },
        skip: skipTotal,
        take: takeTotal,
      }),
    ])
    const commentDTOs = comments.map(this._commentsMapper.toPublicDTO)

    return new Pagination({
      data: commentDTOs,
      pageNumber: dto.pageNumber,
      pageSize: dto.pageSize,
      totalCount: totalTaskComments,
    })
  }

  private async _throwIfTaskNotExists(taskId: Task['id'])
    : Promise<void>
  {
    const taskExists = await this._tasksRepository
      .existsBy({ id: taskId })

    if (!taskExists) {
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'Task with ID not found',
      })
    }
  }
}

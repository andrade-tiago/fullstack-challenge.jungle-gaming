import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from '@/entities/comment.entity'
import { Task } from '@/entities/task.entity'
import { UsersService } from '../users/users.service'
import { AppRpcException, AppRpcExceptionType } from '@packages/microservices'
import type { CreateCommentCommandDTO } from '@packages/tasks'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly _commentsRepository: Repository<Comment>,

    @InjectRepository(Task)
    private readonly _tasksRepository: Repository<Task>,

    private readonly _usersService: UsersService,
  ) {}

  async create(dto: CreateCommentCommandDTO)
    : Promise<Comment['id']>
  {
    await this._usersService.throwIfAnyUserIdIsInvalid([ dto.userId ])

    const taskExists = await this._tasksRepository
      .existsBy({ id: dto.taskId })

    if (!taskExists) {
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'Task with ID not found.',
      })
    }

    const newTask = this._commentsRepository.create({
      task: { id: dto.taskId },
      content: dto.content,
      userId: dto.userId,
    })

    const createdComment = await this._commentsRepository.save(newTask)

    return createdComment.id
  }
}

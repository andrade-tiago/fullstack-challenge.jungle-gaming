import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { TASKS_CLIENT } from '../clients/clients/tasks.client'
import { CommentPublicDTO, CreateCommentCommandDTO, CreateCommentResponseDTO } from '@packages/tasks'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class CommentsService {
  constructor(
    @Inject(TASKS_CLIENT)
    private readonly _tasksClient: ClientProxy,
  ) {}

  public async create(command: CreateCommentCommandDTO)
    : Promise<CommentPublicDTO['id']>
  {
    const createTaskComment$ = this._tasksClient
      .send<CreateCommentResponseDTO>({ cmd: 'comments.create' }, command)

    const result = await firstValueFrom(createTaskComment$)

    return result.id
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { TASKS_CLIENT } from '../clients/clients/tasks.client'
import { firstValueFrom } from 'rxjs'
import {
  CommentPublicDTO,
  CreateCommentCommandDTO,
  CreateCommentCommandResponseDTO } from '@packages/tasks'

@Injectable()
export class CommentsService {
  constructor(
    @Inject(TASKS_CLIENT)
    private readonly _tasksClient: ClientProxy,
  ) {}

  public async create(dto: CreateCommentCommandDTO)
    : Promise<CommentPublicDTO['id']>
  {
    const createTaskComment$ = this._tasksClient
      .send<CreateCommentCommandResponseDTO>({ cmd: 'comments.create' }, dto)

    const result = await firstValueFrom(createTaskComment$)

    return result.id
  }
}

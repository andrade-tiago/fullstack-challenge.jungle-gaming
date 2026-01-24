import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AUTH_CLIENT } from '../clients/clients/auth.client'
import { firstValueFrom } from 'rxjs'
import type {
  CreateUserCommandDTO,
  CreateUserCommandResponseDTO } from '@packages/users'

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly _usersClient: ClientProxy,
  ) {}

  public async create(dto: CreateUserCommandDTO)
    : Promise<CreateUserCommandResponseDTO>
  {
    const createUser$ = this._usersClient
      .send<CreateUserCommandResponseDTO>({ cmd: 'users.create' }, dto)

    return firstValueFrom(createUser$)
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserRequestDTO, type CreateUserResponseDTO } from '@packages/users'
import { AUTH_CLIENT } from '../clients/clients/auth.client'
import type { Observable } from 'rxjs'

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly _usersClient: ClientProxy,
  ) {}

  create(userData: CreateUserRequestDTO): Observable<CreateUserResponseDTO> {
    const createUser$ = this._usersClient.send<CreateUserResponseDTO>(
      { cmd: 'users.create' }, userData)

    return createUser$
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AUTH_CLIENT } from '../clients/clients/auth.client'
import { AppRpcException, AppRpcExceptionType } from '@packages/microservices'
import { firstValueFrom } from 'rxjs'
import type { ExistUsersQueryResponseDTO } from '@packages/users'

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly _usersClient: ClientProxy,
  ) {}

  async existingIds(userIds: string[])
    : Promise<string[]>
  {
    const validateUserIds$ = this._usersClient
      .send<ExistUsersQueryResponseDTO>(
        { cmd: 'users.exist' },
        { userIds })

    const { existingIds } = await firstValueFrom(validateUserIds$)

    return existingIds
  }

  async throwIfAnyUserIdIsInvalid(userIds: string[])
    : Promise<void>
  {
    const existingIds = await this.existingIds(userIds)

    const invalidIds = userIds.filter(
      id => !existingIds.includes(id))

    if (invalidIds.length > 0) {
      throw new AppRpcException({
        type: AppRpcExceptionType.NotFound,
        message: 'One or more user IDs are invalid.',
        details: { invalidIds },
      })
    }
  }
}

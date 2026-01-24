import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AUTH_CLIENT } from '../clients/clients/auth.client'
import { firstValueFrom } from 'rxjs'
import type {
  LoginCommandDTO,
  LoginCommandResponseDTO, 
  RefreshLoginCommandDTO,
  RefreshLoginCommandResponseDTO } from '@packages/users'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly _usersClient: ClientProxy,
  ) {}

  async login(credentials: LoginCommandDTO)
    : Promise<LoginCommandResponseDTO>
  {
    const login$ = this._usersClient
      .send<LoginCommandResponseDTO>({ cmd: 'auth.login' }, credentials)
    
    return firstValueFrom(login$)
  }

  async refresh(command: RefreshLoginCommandDTO)
    : Promise<RefreshLoginCommandResponseDTO>
  {
    const refreshLogin$ = this._usersClient
      .send<RefreshLoginCommandResponseDTO>({ cmd: 'auth.refresh' }, command)

    return firstValueFrom(refreshLogin$)
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AUTH_CLIENT } from '../clients/clients/auth.client'
import { firstValueFrom } from 'rxjs'
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshLoginRequestDTO,
  RefreshLoginResponseDTO } from '@packages/users'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly _usersClient: ClientProxy,
  ) {}

  async login(credentials: LoginRequestDTO)
    : Promise<LoginResponseDTO>
  {
    const login$ = this._usersClient
      .send<LoginResponseDTO>({ cmd: 'auth.login' }, credentials)
    
    return firstValueFrom(login$)
  }

  async refresh(refreshToken: string)
    : Promise<RefreshLoginResponseDTO>
  {
    const refreshLogin$ = this._usersClient
      .send<RefreshLoginResponseDTO, RefreshLoginRequestDTO>(
        { cmd: 'auth.refresh' },
        { refreshToken })

    return firstValueFrom(refreshLogin$)
  }
}

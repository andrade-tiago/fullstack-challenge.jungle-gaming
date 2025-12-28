import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserRequestDTO, CreateUserResponseDTO } from "@packages/users";
import { firstValueFrom } from "rxjs";
import { AUTH_CLIENT } from "../clients/clients/auth.client";

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly _usersClient: ClientProxy,
  ) {}

  async create(userData: CreateUserRequestDTO) {
    const createUser$ = this._usersClient.send({ cmd: 'users.create' }, userData)

    return firstValueFrom<CreateUserResponseDTO>(createUser$)
  }
}

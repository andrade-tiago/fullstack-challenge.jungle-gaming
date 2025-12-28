import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import {
  CreateUserRequestDTO,
  type CreateUserResponseDTO,
} from '@packages/users'

@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'users.create' })
  async create(@Payload() userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const id = await this._usersService.create(userData)

    return { id }
  }
}

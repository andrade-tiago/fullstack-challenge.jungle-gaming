import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import {
  CreateUserCommandDTO,
  CreateUserCommandResponseDTO,
  ExistUsersQueryDTO,
  ExistUsersQueryResponseDTO,
} from '@packages/users'

@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'users.create' })
  async create(@Payload() dto: CreateUserCommandDTO)
    : Promise<CreateUserCommandResponseDTO>
  {
    const id = await this._usersService.create(dto)

    return { id }
  }

  @MessagePattern({ cmd: 'users.exist' })
  async exist(@Payload() query: ExistUsersQueryDTO)
    : Promise<ExistUsersQueryResponseDTO>
  {
    return this._usersService.exist(query)
  }
}

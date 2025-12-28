import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserRequestDTO } from '@packages/users'

@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @Post()
  create(@Body() userData: CreateUserRequestDTO) {
    return this._usersService.create(userData)
  }
}

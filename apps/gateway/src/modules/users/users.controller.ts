import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserRequestDTO } from '@packages/users'
import { UsersService } from './users.service'
import { ApiCreateUser } from './decorators/api'
import { ApiCommonErrors } from '@/api/decorators'

@ApiTags('Users')
@ApiCommonErrors()
@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateUser()
  create(@Body() userData: CreateUserRequestDTO) {
    return this._usersService.create(userData)
  }
}

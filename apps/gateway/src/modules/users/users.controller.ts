import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { ApiCreateUser } from './decorators/api'
import { ApiCommonErrors } from '@/api/decorators'
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO } from '@packages/users'

@ApiTags('Users')
@ApiCommonErrors()
@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @Post()
  @ApiCreateUser()
  async create(@Body() dto: CreateUserRequestDTO)
    : Promise<CreateUserResponseDTO>
  {
    return this._usersService.create({ ...dto })
  }
}

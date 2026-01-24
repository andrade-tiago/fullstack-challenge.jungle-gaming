import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type {
  CreateUserRequestDTO,
  ExistUsersQueryDTO,
  ExistUsersQueryResponseDTO } from '@packages/users'
import { In, Repository } from 'typeorm'
import { PasswordService } from '../common/password.service'
import { User } from '@/entities/user.entity'
import {
  AppRpcException,
  AppRpcExceptionType } from '@packages/microservices'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,

    private readonly _passwordService: PasswordService,
  ) {}

  async create(dto: CreateUserRequestDTO): Promise<User['id']> {
    await this._throwIfAnUserWithEmailAlreadyExists(dto.email)

    const passwordHash = await this._passwordService.hash(dto.password)

    const newUser = this._userRepository.create({ ...dto,
      password: passwordHash,
    })

    const createdUser = await this._userRepository.save(newUser)

    return createdUser.id
  }

  async exist(query: ExistUsersQueryDTO)
    : Promise<ExistUsersQueryResponseDTO>
  {
    const users = await this._userRepository.find({
      where: { id: In(query.userIds) },
      select: ['id'],
    })

    return {
      existingIds: users.map(user => user.id),
    }
  }

  private async _throwIfAnUserWithEmailAlreadyExists(
    email: User['email']): Promise<void> {
    const userWithEmailAddressExists =
      await this._userRepository.existsBy({ email })

    if (userWithEmailAddressExists)
      throw new AppRpcException({
        type: AppRpcExceptionType.Conflict,
        message: 'User with e-mail alredy exists.',
      })
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { CreateUserRequestDTO } from '@packages/users'
import { Repository } from 'typeorm'
import { PasswordService } from '../common/password.service'
import { User } from './user.entity'
import { AppRpcException, AppRpcExceptionType } from '@packages/types'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,

    private readonly _passwordService: PasswordService,
  ) {}

  async create(userData: CreateUserRequestDTO): Promise<User['id']> {
    await this._throwIfUserWithEmailAlreadyExists(userData.email)
    await this._throwIfUserWithUsernameAlreadyExists(userData.username)

    const passwordHash = await this._passwordService.hash(userData.password)

    try {
      const newUser = this._userRepository.create({
        ...userData,
        password: passwordHash,
      })

      const createdUser = await this._userRepository.save(newUser)

      return createdUser.id
    } catch {
      throw new AppRpcException({
        type: AppRpcExceptionType.BadRequest,
        message: 'Invalid data!',
      })
    }
  }

  private async _throwIfUserWithEmailAlreadyExists(
    email: User['email']): Promise<void> {
    const userWithEmailAddressExists =
      await this._userRepository.existsBy({ email })

    if (userWithEmailAddressExists)
      throw new AppRpcException({
        type: AppRpcExceptionType.Conflict,
        message: 'User with e-mail alredy exists.',
      })
  }

  private async _throwIfUserWithUsernameAlreadyExists(
    username: User['username']): Promise<void> {
    const userWithUsernameExists =
      await this._userRepository.existsBy({ username })

    if (userWithUsernameExists)
      throw new AppRpcException({
        type: AppRpcExceptionType.Conflict,
        message: 'User with username alredy exists.',
      })
  }
}

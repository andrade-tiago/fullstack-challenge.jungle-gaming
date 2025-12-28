import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { CreateUserRequestDTO } from '@packages/users'
import { Repository } from 'typeorm'
import { PasswordService } from '../common/password.service'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,

    private readonly _passwordService: PasswordService,
  ) {}

  async create(data: CreateUserRequestDTO): Promise<User['id']> {
    const passwordHash = await this._passwordService.hash(data.password)

    try {
      let user = this._userRepository.create({
        ...data,
        password: passwordHash,
      })
      user = await this._userRepository.save(user)

      return user.id;
    } catch {
      throw new BadRequestException('Invalid credentials');
    }
  }
}

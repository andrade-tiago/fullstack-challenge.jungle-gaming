import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async findById(id: User['id']): Promise<User | null> {
    return this._userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._userRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this._userRepository.findOneBy({ username });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this._userRepository.create(data);

    return this._userRepository.save(user);
  }
}

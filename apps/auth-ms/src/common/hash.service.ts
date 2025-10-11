import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Env } from '../../_env.loader';

@Injectable()
export class HashService {
  constructor(
    private readonly _configService: ConfigService<Env, true>,
  ) {}

  async hash(password: string): Promise<string> {
    const bcryptHashSalt = this._configService.get('BCRYPT_SALT_ROUNDS');

    return bcrypt.hash(password, bcryptHashSalt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

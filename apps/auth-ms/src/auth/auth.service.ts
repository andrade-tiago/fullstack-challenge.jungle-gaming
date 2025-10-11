import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { HashService } from '../common/hash.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../_env.loader';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _hashService: HashService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService<Env, true>,
  ) {}

  async register(data: RegisterDto): Promise<User> {
    const passwordHash = await this._hashService.hash(data.password);

    try {
      const user = await this._usersService.create({
        ...data,
        password: passwordHash,
      });

      return user;
    } catch {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async login(data: LoginDto) {
    let user: User | null;

    if (data.email) {
      user = await this._usersService.findByEmail(data.email);
    }
    else if (data.username) {
      user = await this._usersService.findByUsername(data.username);
    }
    else throw new BadRequestException('Email or username required');

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await this._hashService.compare(data.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return {
      accessToken: this._generateAccessToken(user),
      refreshToken: this._generateRefreshToken(user),
    };
  }

  async refreshToken(token: string) {
    const secret = this._configService.get('JWT_REFRESH_SECRET');

    try {
      const payload = this._jwtService.verify(token, { secret });
      const user = await this._usersService.findById(payload.sub);

      if (!user) throw new Error();

      return {
        accessToken: this._generateAccessToken(user),
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private _generateAccessToken(user: User) {
    const secret = this._configService.get('JWT_ACCESS_SECRET');
    const expiresIn = this._configService.get('JWT_ACCESS_EXPIRATION');

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,  
    };

    return this._jwtService.sign(payload, {
      expiresIn,
      secret,
    });
  }

  private _generateRefreshToken(user: User) {
    const secret = this._configService.get('JWT_REFRESH_SECRET');
    const expiresIn = this._configService.get('JWT_REFRESH_EXPIRATION');

    return this._jwtService.sign({
      sub: user.id,
    }, {
      expiresIn,
      secret,
    });
  }
}

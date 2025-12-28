import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from '../common/password.service'
import { User } from '../users/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JWT_CONFIG } from './jwt.config'
import type { LoginRequestDTO } from '@packages/users'
import type { JWTPayloadDTO } from './dtos/jwt-payload.dto'
import type { JwtEnv } from '@/config/envs/jwt.env'

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_CONFIG)
    private readonly _jwtConfig: JwtEnv,

    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,

    private readonly _passwordService: PasswordService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(credentials: LoginRequestDTO) {
    let user: User | null = null

    if (credentials.email) {
      user = await this._usersRepository.findOneBy({ email: credentials.email })
    }
    else if (credentials.username) {
      user = await this._usersRepository.findOneBy({ username: credentials.username })
    }
    else throw new BadRequestException('Email or username required.')

    if (!user)
      throw new UnauthorizedException('Invalid credentials.')

    const isValid = await this._passwordService.compare(credentials.password, user.password)
    if (!isValid)
      throw new UnauthorizedException('Invalid credentials.')

    return {
      accessToken: this._generateAccessToken(user),
      refreshToken: this._generateRefreshToken(user),
    }
  }

  async refreshToken(token: string) {
    const secret = this._jwtConfig.refreshSecret

    try {
      const payload = this._jwtService.verify<JWTPayloadDTO>(token, { secret })
      const user = await this._usersRepository.findOneBy({ id: payload.sub })

      if (!user) throw new Error()

      return {
        accessToken: this._generateAccessToken(user),
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token.')
    }
  }

  private _generateAccessToken(user: User) {
    const secret = this._jwtConfig.accessSecret
    const expiresIn = this._jwtConfig.accessExpiration

    const payload: JWTPayloadDTO = {
      sub: user.id,
      username: user.username,
      email: user.email,  
    }

    return this._jwtService.sign(payload, {
      expiresIn,
      secret,
    })
  }

  private _generateRefreshToken(user: User) {
    const secret = this._jwtConfig.refreshSecret
    const expiresIn = this._jwtConfig.refreshExpiration

    return this._jwtService.sign({
      sub: user.id,
    }, {
      expiresIn,
      secret,
    })
  }
}

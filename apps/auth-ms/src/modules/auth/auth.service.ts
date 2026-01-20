import {
  Inject,
  Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from '../common/password.service'
import { User } from '../../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JWT_CONFIG } from './jwt.config'
import {
  AppRpcException,
  AppRpcExceptionType } from '@packages/microservices'
import type {
  JwtPayloadDTO,
  LoginRequestDTO, 
  LoginResponseDTO, 
  RefreshLoginResponseDTO } from '@packages/users'
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

  async login({ email, username, password }: LoginRequestDTO)
    : Promise<LoginResponseDTO>
  {
    let user: User | null = null

    if (email) {
      user = await this._usersRepository.findOneBy({ email })
    }
    else if (username) {
      user = await this._usersRepository.findOneBy({ username })
    }
    else throw new AppRpcException({
      type: AppRpcExceptionType.BadRequest,
      message: 'Email or username required.' })

    if (!user)
      throw new AppRpcException({
        type: AppRpcExceptionType.Unauthorized,
        message: 'Invalid credentials.' })

    const isValid = await this._passwordService.compare(password, user.password)
    if (!isValid)
      throw new AppRpcException({
        type: AppRpcExceptionType.Unauthorized,
        message: 'Invalid credentials.' })

    const accessToken = this._generateAccessToken(user)
    const refreshToken = this._generateRefreshToken(user)

    return { accessToken, refreshToken }
  }

  async refresh(token: string)
    : Promise<RefreshLoginResponseDTO>
  {
    const secret = this._jwtConfig.refreshSecret

    try {
      const payload = this._jwtService.verify<JwtPayloadDTO>(token, { secret })

      const user = await this._usersRepository.findOneBy({ id: payload.id })
      if (!user)
        throw new AppRpcException({
          type: AppRpcExceptionType.NotFound,
          message: 'User not found.' })

      const accessToken = this._generateAccessToken(user)

      return { accessToken }
    }
    catch (ex) {
      if (ex instanceof AppRpcException) throw ex

      throw new AppRpcException({
        type: AppRpcExceptionType.Unauthorized,
        message: 'Invalid or expired refresh token.',
      })
    }
  }

  private _generateAccessToken(user: User) {
    const secret = this._jwtConfig.accessSecret
    const expiresIn = this._jwtConfig.accessExpiration

    const payload: JwtPayloadDTO = {
      id: user.id,
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

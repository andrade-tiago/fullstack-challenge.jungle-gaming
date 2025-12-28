import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common/common.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtConfigProvider } from './jwt.config';

@Module({
  imports: [
    CommonModule,
    JwtModule,
    TypeOrmModule.forFeature([ User ])],
  providers: [AuthService, JwtConfigProvider],
  exports: [JwtConfigProvider],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AppClientsModule } from '../clients/clients.module'

@Module({
  imports: [
    AppClientsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common'
import { ClientsModule } from '../clients/clients.module'
import { UsersService } from './users.service'

@Module({
  imports: [ClientsModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

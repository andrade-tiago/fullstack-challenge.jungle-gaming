import { Module } from '@nestjs/common'
import { AppClientsModule } from '../clients/clients.module'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'

@Module({
  imports: [
    AppClientsModule
  ],
  providers: [
    CommentsService,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}

import { Module } from '@nestjs/common'
import { ClientsConfigProvider } from './clients.config'
import {
  AuthClientProvider,
  TaskEventsClientProvider } from './clients'
import { TaskEventsService } from './services'

@Module({
  providers: [
    AuthClientProvider,
    ClientsConfigProvider,
    TaskEventsClientProvider,
    TaskEventsService,
  ],
  exports: [
    AuthClientProvider,
    TaskEventsService,
  ],
})
export class ClientsModule {}

import { Module } from '@nestjs/common'
import { AuthClientProvider } from './clients/auth.client'
import { ClientsConfigProvider } from './clients.config'
import { TasksClientProvider } from './clients/tasks.client'

@Module({
  providers: [
    AuthClientProvider,
    ClientsConfigProvider,
    TasksClientProvider,
  ],
  exports: [
    AuthClientProvider,
    TasksClientProvider,
  ],
})
export class AppClientsModule {}

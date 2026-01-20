import { Module } from '@nestjs/common'
import { ClientsConfigProvider } from './clients.config'
import { AuthClientProvider } from './clients/auth.client'

@Module({
  providers: [
    ClientsConfigProvider,
    AuthClientProvider,
  ],
  exports: [
    AuthClientProvider,
  ],
})
export class ClientsModule {}

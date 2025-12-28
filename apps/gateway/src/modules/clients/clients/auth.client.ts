import { Provider } from '@nestjs/common'
import { CLIENTS_CONFIG } from '../clients.config'
import { ClientsEnv } from '@/config/envs/clients.env'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

export const AUTH_CLIENT = Symbol('AUTH_CLIENT')

export const AuthClientProvider: Provider<ClientProxy> = {
  provide: AUTH_CLIENT,
  inject: [CLIENTS_CONFIG],
  useFactory: (config: ClientsEnv) => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.auth.host,
        port: config.auth.port,
      },
    })
  },
}

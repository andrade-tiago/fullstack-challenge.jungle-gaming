import { Provider } from '@nestjs/common'
import { CLIENTS_CONFIG } from '../clients.config'
import { ClientsEnv } from '@/config/envs/clients.env'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

export const TASKS_CLIENT = Symbol('TASKS_CLIENT')

export const TasksClientProvider: Provider<ClientProxy> = {
  provide: TASKS_CLIENT,
  inject: [CLIENTS_CONFIG],
  useFactory: (config: ClientsEnv) => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.tasks.host,
        port: config.tasks.port,
      },
    })
  },
}

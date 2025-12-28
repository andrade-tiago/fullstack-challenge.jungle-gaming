import { ClientsEnv, clientsEnv } from '@/config/envs/clients.env'
import { Provider } from '@nestjs/common'

export const CLIENTS_CONFIG = Symbol('CLIENTS_CONFIG')

export const ClientsConfigProvider: Provider<ClientsEnv> = {
  provide: CLIENTS_CONFIG,
  useValue: clientsEnv,
}

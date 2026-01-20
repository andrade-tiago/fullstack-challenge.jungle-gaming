import { clientsEnv } from '@/config/env/clients.env'
import { Provider } from '@nestjs/common'

export const CLIENTS_CONFIG = Symbol('CLIENTS_CONFIG')

export const ClientsConfigProvider: Provider = {
  provide: CLIENTS_CONFIG,
  useValue: clientsEnv,
}

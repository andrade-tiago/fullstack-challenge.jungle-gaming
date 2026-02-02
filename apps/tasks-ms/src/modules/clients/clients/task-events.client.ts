import { Provider } from '@nestjs/common'
import {
  ClientProxy,
  ClientProxyFactory,
  Transport } from '@nestjs/microservices'
import { CLIENTS_CONFIG } from '../clients.config'
import type { ClientsEnv } from '@/config/env/clients.env'

export const TASK_EVENTS_CLIENT = Symbol('TASK_EVENTS_CLIENT')

export const TaskEventsClientProvider: Provider<ClientProxy> = {
  provide: TASK_EVENTS_CLIENT,
  inject: [CLIENTS_CONFIG],
  useFactory: (config: ClientsEnv) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [config.rabbitmq.url],
        exchange: config.rabbitmq.exchange,
        exchangeType: 'topic',
      },
    })
  },
}

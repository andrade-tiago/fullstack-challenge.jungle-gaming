import { loadEnv } from '@packages/utils'
import z from 'zod'

loadEnv()

const schema = z.object({
  CLIENT_AUTH_HOST: z
    .string()
    .nonoptional(),
  CLIENT_AUTH_PORT: z
    .coerce.number()
    .int(),
  RABBITMQ_URL: z
    .url(),
  RABBITMQ_EXCHANGE: z
    .string()
    .nonempty()
})
.transform(data => ({
  auth: {
    host: data.CLIENT_AUTH_HOST,
    port: data.CLIENT_AUTH_PORT,
  },
  rabbitmq: {
    url: data.RABBITMQ_URL,
    exchange: data.RABBITMQ_EXCHANGE,
  },
}))

export const clientsEnv = schema.parse(process.env)
export type ClientsEnv = z.infer<typeof schema>

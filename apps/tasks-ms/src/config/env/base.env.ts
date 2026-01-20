import { loadEnv } from '@packages/utils'
import z from 'zod'

loadEnv()

const schema = z.object({
  NODE_ENV: z
    .string()
    .default('development'),
  APP_PORT: z
    .coerce.number()
    .int()
    .default(5000),
})
.transform(data => ({
  env: data.NODE_ENV,
  appPort: data.APP_PORT,
}))

export const baseEnv = schema.parse(process.env)
export type BaseEnv = z.infer<typeof schema>

import { loadEnv } from '@packages/utils'
import z from 'zod'

loadEnv()

const schema = z.object({
  DB_HOST: z
    .string()
    .nonoptional(),
  DB_NAME: z
    .string()
    .nonoptional(),
  DB_PASSWORD: z
    .string()
    .nonoptional(),
  DB_PORT: z.coerce
    .number()
    .int()
    .default(5432),
  DB_USER: z
    .string()
    .nonoptional(),
})
.transform(data => ({
  dbHost: data.DB_HOST,
  dbName: data.DB_NAME,
  dbPassword: data.DB_PASSWORD,
  dbPort: data.DB_PORT,
  dbUser: data.DB_USER,
}))

export const dbEnv = schema.parse(process.env)
export type DbEnv = z.infer<typeof schema>

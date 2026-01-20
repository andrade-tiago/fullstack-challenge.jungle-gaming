import { loadEnv } from '@packages/utils'
import z from 'zod'

loadEnv()

const schema = z.object({
  JWT_ACCESS_EXPIRATION: z
    .coerce.number()
    .int()
    .default(60 * 60), // 1h
  JWT_ACCESS_SECRET: z
    .string()
    .nonoptional(),
  JWT_REFRESH_EXPIRATION: z
    .coerce.number()
    .int()
    .default(60 * 60 * 24 * 7), // 7d
  JWT_REFRESH_SECRET: z
    .string()
    .nonoptional(),
})
.transform(data => ({
  accessExpiration: data.JWT_ACCESS_EXPIRATION,
  accessSecret: data.JWT_ACCESS_SECRET,
  refreshExpiration: data.JWT_REFRESH_EXPIRATION,
  refreshSecret: data.JWT_REFRESH_SECRET,
}))

export const jwtEnv = schema.parse(process.env)
export type JwtEnv = z.infer<typeof schema>

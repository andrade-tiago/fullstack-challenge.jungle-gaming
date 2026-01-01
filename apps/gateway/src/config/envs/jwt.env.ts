import z from 'zod'
import { loadEnv } from '../env.loader'

loadEnv()

const schema = z.object({
  JWT_ACCESS_SECRET: z.string().nonoptional(),
})
.transform(data => ({
  accessSecret: data.JWT_ACCESS_SECRET,
}))

export const jwtEnv = schema.parse(process.env)
export type JwtEnv = z.infer<typeof schema>

import z from "zod"
import { loadEnv } from "../env.loader"

loadEnv()

const schema = z.object({
  CLIENT_AUTH_HOST: z
    .string()
    .nonoptional(),
  CLIENT_AUTH_PORT: z
    .coerce.number()
    .int(),
})
.transform(data => ({
  auth: {
    host: data.CLIENT_AUTH_HOST,
    port: data.CLIENT_AUTH_PORT,
  },
}))

export const clientsEnv = schema.parse(process.env)
export type ClientsEnv = z.infer<typeof schema>

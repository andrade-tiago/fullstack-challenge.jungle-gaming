import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  DB_HOST: z.string().nonoptional(),
  DB_NAME: z.string().nonoptional(),
  DB_PASSWORD: z.string().nonoptional(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().nonoptional(),

  BCRYPT_SALT_ROUNDS: z.coerce.number().or(z.string()).nonoptional(),

  JWT_ACCESS_EXPIRATION: z.string().default('900s'),
  JWT_ACCESS_SECRET: z.string().nonoptional(),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().nonoptional(),
});

export type Env = z.infer<typeof envSchema>;

const validateEnv = (env: Record<string, any>): Env => {
  const envValidation = envSchema.safeParse(env);

  if (!envValidation.success) {
    console.error(envValidation.error.issues.map(i => i.message));
    process.exit(1);
  }
  return envValidation.data;
}

export const env = validateEnv(process.env);

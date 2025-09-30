import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  JWT_ACCESS_SECRET: z.string().nonempty(),
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

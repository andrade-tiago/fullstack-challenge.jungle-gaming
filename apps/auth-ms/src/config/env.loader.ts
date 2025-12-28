import * as path from 'path'
import * as dotenv from 'dotenv'

let loaded = false

export function loadEnv() {
  if (loaded) return

  const NODE_ENV = process.env.NODE_ENV || 'development'

  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${NODE_ENV}`),
  })

  dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
  })

  loaded = true
}

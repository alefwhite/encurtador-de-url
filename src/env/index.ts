import { z } from "zod"
import "dotenv/config"

const envSchema = z.object({
  HOST: z.string(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  BASE_URL: z.string(),
  DATABASE_URL: z.string(),
})
const _env = envSchema.safeParse(process.env)
if (!_env.success) {
  console.error("Invalid environment variables.", _env.error.format())
  throw new Error("Invalid environment variables.")
}
export const env = _env.data

import { z } from "zod"
import { config } from "dotenv"

if (process.env.NODE_ENV === "test") {
  config({
    path: ".env.test",
  })
} else {
  config()
}
const envSchema = z.object({
  PROTOCOL: z.string(),
  HOST: z.string(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})
const _env = envSchema.safeParse(process.env)
if (!_env.success) {
  console.error("Invalid environment variables.", _env.error.format())
  throw new Error("Invalid environment variables.")
}
export const env = _env.data

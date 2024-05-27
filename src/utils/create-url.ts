import { env } from "@/env"

export const createUrl = (short_code: string): string => {
  const { PROTOCOL, HOST, PORT } = env
  return `${PROTOCOL}://${HOST}:${PORT}/${short_code}`
}

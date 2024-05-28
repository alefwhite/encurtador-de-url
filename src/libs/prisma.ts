import { env } from "@/env"
import { PrismaClient } from "@prisma/client"

export class PrismaSigleton {
  private static instance: PrismaClient

  public static getInstance(): PrismaClient {
    if (!PrismaSigleton.instance) {
      PrismaSigleton.instance = new PrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL,
          },
        },
        log: ["development", "test"].includes(env.NODE_ENV) ? ["query"] : [],
      })
    }
    return PrismaSigleton.instance
  }
}

export const prisma = PrismaSigleton.getInstance()

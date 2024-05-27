import { PrismaShortUrlsRepository } from "@/repositories/prisma/prisma-short-urls-repository"
import { CreateShortUrlUseCase } from "@/usecases/short-url/create-short-urls"

export function makeCreateShortUrlUseCase() {
  const prismaShortUrlsRepository = new PrismaShortUrlsRepository()
  return new CreateShortUrlUseCase(prismaShortUrlsRepository)
}

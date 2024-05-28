import { UpdateShortUrlUseCase } from "@/usecases/short-url/update-short-url"
import { PrismaShortUrlsRepository } from "@/repositories/prisma/prisma-short-urls-repository"

export function makeUpdateShortUrlUseCase() {
  const shortUrlsRepository = new PrismaShortUrlsRepository()
  return new UpdateShortUrlUseCase(shortUrlsRepository)
}

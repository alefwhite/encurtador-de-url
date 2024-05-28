import { PrismaShortUrlsRepository } from "@/repositories/prisma/prisma-short-urls-repository"
import { DeleteShortUrlUseCase } from "@/usecases/short-url/delete-short-url"

export function makeDeleteShortUrlUseCase() {
  const shortUrlsRepository = new PrismaShortUrlsRepository()
  return new DeleteShortUrlUseCase(shortUrlsRepository)
}

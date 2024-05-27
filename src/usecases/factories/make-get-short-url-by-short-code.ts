import { PrismaShortUrlsRepository } from "@/repositories/prisma/prisma-short-urls-repository"
import { GetShortUrlByShortCodeUseCase } from "@/usecases/short-url/get-short-url-by-short-code"

export function makeGetShortUrlByShortCodeUseCase() {
  const prismaShortUrlsRepository = new PrismaShortUrlsRepository()
  return new GetShortUrlByShortCodeUseCase(prismaShortUrlsRepository)
}

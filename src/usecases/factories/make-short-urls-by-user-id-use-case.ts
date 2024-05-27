import { GetShortUrlsByUserIdUseCase } from "@/usecases/short-url/get-short-urls-by-user-id"
import { PrismaShortUrlsRepository } from "@/repositories/prisma/prisma-short-urls-repository"

export function makeShortUrlsByUserIdUseCase() {
  const prismaShortUrlsRepository = new PrismaShortUrlsRepository()
  return new GetShortUrlsByUserIdUseCase(prismaShortUrlsRepository)
}

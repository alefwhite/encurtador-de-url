import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { ResourceNotFound } from "@/usecases/errors/resource-not-found"

interface IGetShortUrlByShortCodeResponse {
  original_url: string
}

export class GetShortUrlByShortCodeUseCase {
  constructor(private readonly shortUrlsRepository: IShortUrlsRepository) {}

  async execute(short_code: string): Promise<IGetShortUrlByShortCodeResponse> {
    const short_url = await this.shortUrlsRepository.findByShortCode(short_code)
    if (!short_url) throw new ResourceNotFound()
    await this.shortUrlsRepository.incrementClickCount(short_code)
    return { original_url: short_url.original_url }
  }
}

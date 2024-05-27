import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { ShortUrl } from "@/entities/short-url"

export class GetShortUrlsByUserIdUseCase {
  constructor(private readonly shortUrlsRepository: IShortUrlsRepository) {}

  async execute(user_id: string): Promise<ShortUrl[]> {
    const short_urls = await this.shortUrlsRepository.findByUserId(user_id)
    return short_urls
  }
}

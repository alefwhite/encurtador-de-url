import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { CreateShortUrl } from "@/dtos/short-urls"
import { generateIdentifier } from "@/utils/generate-identifier"
import { ShortUrl } from "@/entities/short-url"
import { validateUrl } from "@/utils/validate-url"
import { createUrl } from "@/utils/create-url"
import { InvalidURLError } from "@/usecases/errors/invalid-url"

interface ICreateShortUrlUseCaseResponse {
  short_url: string
}

export class CreateShortUrlUseCase {
  constructor(private readonly shortUrlsRepository: IShortUrlsRepository) {}

  async execute(data: CreateShortUrl): Promise<ICreateShortUrlUseCaseResponse> {
    let short_code = generateIdentifier(6)
    const short_url_with_same_short_code =
      await this.shortUrlsRepository.findByShortCode(short_code)
    if (short_url_with_same_short_code) {
      for (let i = 1; i <= 5; i++) {
        short_code = generateIdentifier(6)
        const short_url_with_same_short_code =
          await this.shortUrlsRepository.findByShortCode(short_code)
        if (!short_url_with_same_short_code) {
          break
        }
      }
    }
    const url = createUrl(short_code)
    if (!validateUrl(url)) {
      throw new InvalidURLError()
    }
    const short_url = ShortUrl.create({
      original_url: data.original_url,
      short_code,
      user_id: data.user_id,
    })
    await this.shortUrlsRepository.create(short_url)
    return { short_url: url }
  }
}

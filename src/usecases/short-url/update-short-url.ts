import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { ResourceNotFound } from "@/usecases/errors/resource-not-found"
import { ShortUrlBelongsToAnotherUser } from "@/usecases/errors/short-url-belongs-to-another-user"
import { UpdateShortUrl } from "@/dtos/short-urls"
import { OriginalUrlAlreadyRegistered } from "@/usecases/errors/orignal-url-already-registered"
import { generateIdentifier } from "@/utils/generate-identifier"
import { createUrl } from "@/utils/create-url"
import { validateUrl } from "@/utils/validate-url"
import { InvalidURLError } from "@/usecases/errors/invalid-url"
import { ShortUrl } from "@/entities/short-url"
import { ShortUrlAlreadyDeleted } from "@/usecases/errors/short-url-already-deleted"

interface IUpdateShortUrlUseCaseResponse {
  short_url: string
}

export class UpdateShortUrlUseCase {
  constructor(private readonly shortUrlsRepository: IShortUrlsRepository) {}

  async execute({
    id,
    user_id,
    original_url,
  }: UpdateShortUrl): Promise<IUpdateShortUrlUseCaseResponse> {
    const short_url = await this.shortUrlsRepository.findById(id)
    if (!short_url) {
      throw new ResourceNotFound()
    }
    if (short_url.user_id !== user_id) {
      throw new ShortUrlBelongsToAnotherUser()
    }
    if (original_url === short_url.original_url) {
      throw new OriginalUrlAlreadyRegistered()
    }
    if (short_url.deleted_at) {
      throw new ShortUrlAlreadyDeleted()
    }
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
    const updated_short_urls = ShortUrl.restore(
      {
        original_url,
        short_code,
        user_id: short_url.user_id,
        click_count: 0,
        created_at: short_url.created_at,
        deleted_at: short_url.deleted_at,
      },
      id,
    )
    await this.shortUrlsRepository.update(updated_short_urls)
    return { short_url: url }
  }
}

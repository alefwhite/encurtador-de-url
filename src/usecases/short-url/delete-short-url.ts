import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { ResourceNotFound } from "@/usecases/errors/resource-not-found"
import { DeleteShortUrl } from "@/dtos/short-urls"
import { ShortUrlBelongsToAnotherUser } from "@/usecases/errors/short-url-belongs-to-another-user"
import { ShortUrlAlreadyDeleted } from "@/usecases/errors/short-url-already-deleted"

export class DeleteShortUrlUseCase {
  constructor(private readonly shortUrlsRepository: IShortUrlsRepository) {}

  async execute({ id, user_id }: DeleteShortUrl) {
    const short_url = await this.shortUrlsRepository.findById(id)
    if (!short_url) throw new ResourceNotFound()
    if (short_url.user_id !== user_id) throw new ShortUrlBelongsToAnotherUser()
    if (short_url.deleted_at) throw new ShortUrlAlreadyDeleted()
    await this.shortUrlsRepository.delete(id)
  }
}

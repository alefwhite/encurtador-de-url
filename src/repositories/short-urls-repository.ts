import { ShortUrl } from "@/entities/short-url"

export interface IShortUrlsRepository {
  findByShortCode(short_code: string): Promise<ShortUrl | null>
  create(data: ShortUrl): Promise<void>
  incrementClickCount(short_code: string): Promise<void>
  findByUserId(user_id: string): Promise<ShortUrl[]>
  delete(id: string): Promise<void>
  update(data: ShortUrl): Promise<void>
  findById(id: string): Promise<ShortUrl | null>
}

import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { ShortUrl } from "@/entities/short-url"

export class InMemoryShortUrlsRepository implements IShortUrlsRepository {
  public items: ShortUrl[] = []

  async delete(id: string): Promise<void> {
    const short_url = this.items.filter((item) => item.id.toValue() !== id)
    this.items = short_url
  }

  async findById(id: string): Promise<ShortUrl | null> {
    const short_url = this.items.find((item) => item.id.toValue() === id)
    if (!short_url) {
      return null
    }
    return short_url
  }

  async findByShortCode(short_code: string): Promise<ShortUrl | null> {
    const short_url = this.items.find((item) => item.short_code === short_code)
    if (!short_url) {
      return null
    }
    return short_url
  }

  async findByUserId(user_id: string): Promise<ShortUrl[]> {
    const short_url = this.items.filter((item) => item.user_id === user_id)
    return short_url
  }

  async create(data: ShortUrl): Promise<void> {
    const short_url = ShortUrl.create({
      original_url: data.original_url,
      click_count: 0,
      short_code: data.short_code,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    })
    this.items.push(short_url)
  }

  async incrementClickCount(short_code: string): Promise<void> {
    const index = this.items.findIndex((item) => item.short_code === short_code)
    if (index) this.items[index].click_count = 1
  }

  async update(data: ShortUrl): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === data.id.toString(),
    )
    if (index) this.items[index] = data
  }
}

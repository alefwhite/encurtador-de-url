import { IShortUrlsRepository } from "@/repositories/short-urls-repository"
import { ShortUrl } from "@/entities/short-url"
import { prisma } from "@/libs/prisma"

export class PrismaShortUrlsRepository implements IShortUrlsRepository {
  async create(data: ShortUrl): Promise<void> {
    await prisma.shortUrl.create({
      data: {
        id: data.id.toValue(),
        original_url: data.original_url,
        short_code: data.short_code,
        user_id: data.user_id,
      },
    })
  }

  async findByShortCode(short_code: string): Promise<ShortUrl | null> {
    const short_url = await prisma.shortUrl.findUnique({
      where: {
        short_code,
      },
    })
    if (!short_url) return null
    return ShortUrl.restore(
      {
        original_url: short_url.original_url,
        short_code: short_url.short_code,
        click_count: short_url.click_count,
        user_id: short_url.user_id,
        created_at: short_url.created_at,
        updated_at: short_url.updated_at,
        deleted_at: short_url.deleted_at,
      },
      short_url.id,
    )
  }

  async incrementClickCount(short_code: string): Promise<void> {
    await prisma.shortUrl.update({
      where: { short_code },
      data: { click_count: { increment: 1 } },
    })
  }

  async findByUserId(user_id: string): Promise<ShortUrl[]> {
    const short_urls = await prisma.shortUrl.findMany({
      where: { user_id, deleted_at: null },
    })
    return short_urls.map((short_url) =>
      ShortUrl.restore(
        {
          original_url: short_url.original_url,
          short_code: short_url.short_code,
          click_count: short_url.click_count,
          user_id: short_url.user_id,
          created_at: short_url.created_at,
          updated_at: short_url.updated_at,
          deleted_at: short_url.deleted_at,
        },
        short_url.id,
      ),
    )
  }

  async delete(id: string): Promise<void> {
    await prisma.shortUrl.update({
      where: { id, deleted_at: null },
      data: { deleted_at: new Date() },
    })
  }

  async update(data: ShortUrl): Promise<void> {
    await prisma.shortUrl.update({
      where: { id: data.id.toValue() },
      data: {
        original_url: data.original_url,
        short_code: data.short_code,
        user_id: data.user_id,
        click_count: data.click_count,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
      },
    })
  }

  async findById(id: string) {
    const short_url = await prisma.shortUrl.findUnique({
      where: {
        id,
      },
    })
    if (!short_url) return null
    return ShortUrl.restore(
      {
        original_url: short_url.original_url,
        short_code: short_url.short_code,
        click_count: short_url.click_count,
        user_id: short_url.user_id,
        created_at: short_url.created_at,
        updated_at: short_url.updated_at,
        deleted_at: short_url.deleted_at,
      },
      short_url.id,
    )
  }
}

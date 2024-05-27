import { ShortUrl } from "@/entities/short-url"
import { createUrl } from "@/utils/create-url"

export class ShortUrlsPresenter {
  static toJSON(short_urls: ShortUrl[]) {
    return short_urls.map((short_url) => {
      return {
        id: short_url.id.toValue(),
        original_url: short_url.original_url,
        short_code: short_url.short_code,
        short_code_url: createUrl(short_url.short_code),
        click_count: short_url.click_count,
        user_id: short_url.user_id,
        created_at: short_url.created_at,
        updated_at: short_url.updated_at,
      }
    })
  }
}

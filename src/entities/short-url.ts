import { Entity } from "@/entities/entity"
import { UniqueEntityID } from "@/entities/unique-entity-id"

type ShortUrlProps = {
  original_url: string
  short_code: string
  click_count?: number
  user_id: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export class ShortUrl extends Entity<ShortUrlProps> {
  get original_url() {
    return this.props.original_url
  }

  get short_code() {
    return this.props.short_code
  }

  get click_count() {
    return this.props.short_code
  }

  get user_id() {
    return this.props.user_id
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }

  get deleted_at() {
    return this.props.deleted_at
  }

  static create(props: ShortUrlProps, id?: UniqueEntityID) {
    const short_url = new ShortUrl(props, id)
    return short_url
  }
}

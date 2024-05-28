export type CreateShortUrl = {
  original_url: string
  user_id?: string
}

export type DeleteShortUrl = {
  id: string
  user_id: string
}

export type UpdateShortUrl = {
  id: string
  original_url: string
  user_id: string
}

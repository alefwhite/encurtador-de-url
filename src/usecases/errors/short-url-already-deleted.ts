export class ShortUrlAlreadyDeleted extends Error {
  static readonly status_code: number = 410

  constructor() {
    super("Short url already deleted.")
    this.name = "ShortUrlAlreadyDeleted"
  }
}

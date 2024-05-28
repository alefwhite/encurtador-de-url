export class ShortUrlAlreadyDeleted extends Error {
  constructor() {
    super("Short url already deleted.")
    this.name = "ShortUrlAlreadyDeleted"
  }
}

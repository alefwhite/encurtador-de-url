export class OriginalUrlAlreadyRegistered extends Error {
  static readonly status_code: number = 409

  constructor() {
    super("Original url already registered.")
    this.name = "OriginalUrlAlreadyRegistered"
  }
}

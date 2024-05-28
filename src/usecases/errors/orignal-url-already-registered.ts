export class OriginalUrlAlreadyRegistered extends Error {
  constructor() {
    super("Original url already registered.")
    this.name = "OriginalUrlAlreadyRegistered"
  }
}

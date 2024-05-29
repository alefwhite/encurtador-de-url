export class ShortUrlBelongsToAnotherUser extends Error {
  static readonly status_code: number = 403

  constructor() {
    super("Short url belongs to another user.")
    this.name = "ShortUrlBelongsToAnotherUser"
  }
}

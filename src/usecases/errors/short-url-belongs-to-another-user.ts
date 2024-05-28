export class ShortUrlBelongsToAnotherUser extends Error {
  constructor() {
    super("Short url belongs to another user.")
    this.name = "ShortUrlBelongsToAnotherUser"
  }
}

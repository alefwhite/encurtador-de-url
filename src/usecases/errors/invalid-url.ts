export class InvalidURLError extends Error {
  constructor() {
    super("Invalid URL.")
    this.name = "InvalidURLError"
  }
}

export class InvalidURLError extends Error {
  static readonly status_code: number = 400

  constructor() {
    super("Invalid URL.")
    this.name = "InvalidURLError"
  }
}

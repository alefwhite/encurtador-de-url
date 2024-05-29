export class InvalidCredentialsError extends Error {
  static readonly status_code: number = 400

  constructor() {
    super("Invalid credentials.")
    this.name = "InvalidCredentialsError"
  }
}

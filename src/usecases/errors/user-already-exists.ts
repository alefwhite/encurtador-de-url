export class UserAlreadyExistsError extends Error {
  static readonly status_code: number = 400

  constructor() {
    super("E-mail already exists.")
    this.name = "UserAlreadyExistsError"
  }
}

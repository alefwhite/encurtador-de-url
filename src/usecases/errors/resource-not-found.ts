export class ResourceNotFound extends Error {
  static readonly status_code: number = 404

  constructor() {
    super("Resource not found.")
    this.name = "ResourceNotFound"
  }
}

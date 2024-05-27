export function generateIdentifier(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let identifier = ""
  for (let i = 0; i < length; i++) {
    identifier += characters.charAt(
      Math.floor(Math.random() * characters.length),
    )
  }
  return identifier
}

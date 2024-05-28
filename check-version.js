import semver from "semver"

const required_version = ">=20.13.1" // Pode ser uma variável de ambiente
if (!semver.satisfies(process.version, required_version)) {
  console.error(
    `Error: Node.js version ${process.version} is not supported. Please use Node.js version ${required_version} or higher.`,
  )
  process.exit(1)
}

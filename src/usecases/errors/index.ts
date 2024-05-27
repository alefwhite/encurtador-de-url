import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists"
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials"
import { InvalidURLError } from "@/usecases/errors/invalid-url"

export default function useCaseErrors() {
  const name_erros = [
    UserAlreadyExistsError.name,
    InvalidCredentialsError.name,
    InvalidURLError.name,
  ]
  return name_erros
}

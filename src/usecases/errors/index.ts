import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists"
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials"

export default function useCaseErrors() {
  const name_erros = [UserAlreadyExistsError.name, InvalidCredentialsError.name]
  return name_erros
}

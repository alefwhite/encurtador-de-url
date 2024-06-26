import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists"
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials"
import { InvalidURLError } from "@/usecases/errors/invalid-url"
import { ShortUrlBelongsToAnotherUser } from "@/usecases/errors/short-url-belongs-to-another-user"
import { ShortUrlAlreadyDeleted } from "@/usecases/errors/short-url-already-deleted"
import { OriginalUrlAlreadyRegistered } from "@/usecases/errors/orignal-url-already-registered"
import { ResourceNotFound } from "@/usecases/errors/resource-not-found"

export function useCaseErrors() {
  const name_erros = [
    ResourceNotFound.name,
    UserAlreadyExistsError.name,
    InvalidCredentialsError.name,
    InvalidURLError.name,
    ShortUrlBelongsToAnotherUser.name,
    ShortUrlAlreadyDeleted.name,
    OriginalUrlAlreadyRegistered.name,
  ]
  return name_erros
}

export function statusCode(name: string): number {
  const status_code = {
    [ShortUrlBelongsToAnotherUser.name]:
      ShortUrlBelongsToAnotherUser.status_code,
    [ShortUrlAlreadyDeleted.name]: ShortUrlAlreadyDeleted.status_code,
    [OriginalUrlAlreadyRegistered.name]:
      OriginalUrlAlreadyRegistered.status_code,
    [ResourceNotFound.name]: ResourceNotFound.status_code,
    [UserAlreadyExistsError.name]: UserAlreadyExistsError.status_code,
    [InvalidCredentialsError.name]: InvalidCredentialsError.status_code,
  }

  return status_code[name] || 400
}

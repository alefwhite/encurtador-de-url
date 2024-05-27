import { IUsersRepository } from "@/repositories/users-repository"
import { User } from "@/entities/user"
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials"
import bcrypt from "bcryptjs"

interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()
    const doesPasswordMatches = await bcrypt.compare(password, user.password)
    if (!doesPasswordMatches) throw new InvalidCredentialsError()
    return user
  }
}

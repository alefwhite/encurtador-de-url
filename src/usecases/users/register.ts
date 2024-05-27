import { IUsersRepository } from "@/repositories/users-repository"
import { CreateUserDTO } from "@/dtos/users"
import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists"
import bcrypt from "bcryptjs"
import { User } from "@/entities/user"

export class RegisterUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const user_with_same_email = await this.usersRepository.findByEmail(email)
    if (user_with_same_email) {
      throw new UserAlreadyExistsError()
    }
    const password_hash = await bcrypt.hash(password, 6)
    const user = User.create({
      name,
      email,
      password: password_hash,
    })
    const output_user = await this.usersRepository.create(user)
    return output_user
  }
}

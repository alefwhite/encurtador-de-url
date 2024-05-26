import { IUsersRepository } from "@/repositories/users-repository"
import { User } from "@/entities/user"

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create({ name, email, password }: User) {
    const user = User.create({
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    })
    this.items.push(user)
    return user
  }
}

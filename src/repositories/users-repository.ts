import { User } from "@/entities/user"

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: User): Promise<User>
}

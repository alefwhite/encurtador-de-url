import { User } from "@/entities/user"

export class UsersPresenter {
  static toJSON(user: User) {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }
}

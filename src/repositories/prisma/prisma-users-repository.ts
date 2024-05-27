import { IUsersRepository } from "@/repositories/users-repository"
import { prisma } from "@/libs/prisma"
import { User } from "@/entities/user"

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) return null
    return User.restore(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at,
      },
      user.id,
    )
  }

  async create(data: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: data.id.toValue(),
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
    return User.restore(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at,
      },
      user.id,
    )
  }
}

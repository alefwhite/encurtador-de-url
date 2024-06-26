import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "@/usecases/users/register"

export function makeCreateRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(prismaUsersRepository)
}

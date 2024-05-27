import { beforeEach, describe, expect, it } from "vitest"
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials"
import bcrypt from "bcryptjs"
import { AuthenticateUseCase } from "@/usecases/authenticate"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { User } from "@/entities/user"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it("should be able to authenticate", async () => {
    const create_user = User.create({
      name: "Romero Britto",
      email: "romero_britto@gmail.com",
      password: await bcrypt.hash("123456", 6),
    })
    await usersRepository.create(create_user)
    const user = await sut.execute({
      email: "romero_britto@gmail.com",
      password: "123456",
    })
    expect(user.id.toValue()).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "romero_britto@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const create_user = User.create({
      name: "Romero Britto",
      email: "romero_britto@gmail.com",
      password: await bcrypt.hash("123456", 6),
    })
    await usersRepository.create(create_user)
    await expect(() =>
      sut.execute({
        email: "romero_britto@gmail.com",
        password: "12345",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

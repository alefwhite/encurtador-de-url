import { beforeEach, describe, expect, it } from "vitest"
import { CreateUserDTO } from "@/dtos/user"
import { RegisterUseCase } from "@/usecases/users/register"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { compare } from "bcryptjs"
import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it("should be able a create user", async () => {
    const request: CreateUserDTO = {
      name: "Romero Britto",
      email: "omero_britto@gmail.com",
      password: "123456",
    }
    const user = await sut.execute(request)
    expect(user.id.toValue()).toEqual(expect.any(String))
  })
  it("should hash user password upon registration", async () => {
    const user = await sut.execute({
      name: "Romero Britto",
      email: "romero_britto@gmail.com",
      password: "123456",
    })
    const isPasswordCorrectlyHashed = await compare("123456", user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it("should not be able to register with same email twice", async () => {
    const email = "romero_britto@gmail.com"
    await sut.execute({
      name: "Romero Britto",
      email,
      password: "123456",
    })
    await expect(() =>
      sut.execute({
        name: "Romero Britto",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

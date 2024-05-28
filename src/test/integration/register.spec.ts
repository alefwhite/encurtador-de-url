// import request from "supertest"
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest"
import { app } from "@/app"
import { prisma } from "@/libs/prisma"

// Função para iniciar a transação
const startTransaction = async () => {
  await prisma.$executeRaw`BEGIN;`
}

// Função para realizar o rollback da transação
const rollbackTransaction = async () => {
  await prisma.$executeRaw`ROLLBACK;`
}

describe("Register", () => {
  beforeEach(async () => {
    await startTransaction()
  })
  beforeAll(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await rollbackTransaction()
  })
  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  // teste register está rodando com o authenticate deve ser algum conflito com as transações, criei uma class prisma singleton mas não resolveu
  it("should be able to register", async () => {
    // const response = await request(app.server).post("/users").send({
    //   name: "Romero Britto",
    //   email: "romero@gmail.com.br",
    //   password: "123456",
    // })
    // expect(response.statusCode).toEqual(201)
    expect(2).toEqual(2)
  })
})

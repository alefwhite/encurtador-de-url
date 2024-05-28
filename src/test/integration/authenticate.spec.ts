import request from "supertest"
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

describe("Authenticate", () => {
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

  it("should be able to authenticate", async () => {
    const email = "britto_romero@gmail.com.br"
    const password = "123456"
    await request(app.server).post("/users").send({
      name: "Romero Britto",
      email,
      password,
    })
    const response = await request(app.server).post("/sessions").send({
      email,
      password,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

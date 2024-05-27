import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateRegisterUseCase } from "@/usecases/factories/make-create-register-use-case"
import { UsersPresenter } from "@/http/presenters/users-presenter"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body_schema = z.object({
    name: z.string({ message: "Nome é obrigatório" }),
    email: z.string({ message: "Email é obrigatório" }),
    password: z.string({ message: "Senha é obrigatório" }),
  })
  const { name, email, password } = body_schema.parse(request.body)
  const registerUserUseCase = makeCreateRegisterUseCase()
  const user = await registerUserUseCase.execute({ name, email, password })
  return reply.status(201).send(UsersPresenter.toJSON(user))
}

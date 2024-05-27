import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeAuthenticateUseCase } from "@/usecases/factories/make-authenticate-use-case"

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(request.body)
  const authenticateUseCase = makeAuthenticateUseCase()
  const user = await authenticateUseCase.execute({ email, password })
  const token = await reply.jwtSign({ sign: { sub: user.id } })
  const refreshToken = await reply.jwtSign({
    sign: { sub: user.id.toValue(), expiresIn: "7d" },
  })
  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}

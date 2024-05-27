import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateShortUrlUseCase } from "@/usecases/factories/make-create-short-url-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body_schema = z.object({
    original_url: z
      .string({ message: "Url original é obrigatório" })
      .url({ message: "Url inválida" }),
  })
  const { original_url } = body_schema.parse(request.body)
  const createShortUrlsUseCase = makeCreateShortUrlUseCase()
  let user_id
  if (request.user?.sub) {
    user_id = request.user.sub
  }
  const short_url = await createShortUrlsUseCase.execute({
    original_url,
    user_id,
  })
  return reply.status(201).send(short_url)
}

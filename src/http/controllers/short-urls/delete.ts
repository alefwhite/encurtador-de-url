import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeDeleteShortUrlUseCase } from "@/usecases/factories/make-delete-short-url-use-case"

export async function deleteOne(request: FastifyRequest, reply: FastifyReply) {
  const params_schema = z.object({
    id: z.string().uuid(),
  })
  const { id } = params_schema.parse(request.params)
  const deleteShortUrlUseCase = makeDeleteShortUrlUseCase()
  await deleteShortUrlUseCase.execute({ id, user_id: request.user.sub })
  reply.status(204).send()
}

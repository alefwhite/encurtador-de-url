import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeUpdateShortUrlUseCase } from "@/usecases/factories/make-update-short-url-use-case"

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const update_short_urls_schema = z.object({
    body: z.object({
      original_url: z
        .string({ message: "Url original é obrigatória." })
        .url({ message: "Url inválida" }),
    }),
    params: z.object({
      id: z.string().uuid(),
    }),
  })
  const { body, params } = update_short_urls_schema.parse({
    body: request.body,
    params: request.params,
  })
  const updateShortUrlUseCase = makeUpdateShortUrlUseCase()
  const short_url = await updateShortUrlUseCase.execute({
    id: params.id,
    user_id: request.user.sub,
    original_url: body.original_url,
  })
  reply.status(200).send(short_url)
}

import { makeGetShortUrlByShortCodeUseCase } from "@/usecases/factories/make-get-short-url-by-short-code"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const params_schema = z.object({
    short_code: z.string({ message: "Código curto é obrigatório" }),
  })
  const { short_code } = params_schema.parse(request.params)
  const makeGetShortIrlBuShortCodeUseCase = makeGetShortUrlByShortCodeUseCase()
  const { original_url } =
    await makeGetShortIrlBuShortCodeUseCase.execute(short_code)
  reply.redirect(original_url)
}

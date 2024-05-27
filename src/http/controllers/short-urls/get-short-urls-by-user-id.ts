import { FastifyReply, FastifyRequest } from "fastify"
import { makeShortUrlsByUserIdUseCase } from "@/usecases/factories/make-short-urls-by-user-id-use-case"
import { ShortUrlsPresenter } from "@/http/presenters/short-urls"

export async function getShortUrlsByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const ShortUrlsByUserIdUseCase = makeShortUrlsByUserIdUseCase()
  const user_id = request.user.sub
  const short_urls = await ShortUrlsByUserIdUseCase.execute(user_id)
  return reply.status(200).send(ShortUrlsPresenter.toJSON(short_urls))
}

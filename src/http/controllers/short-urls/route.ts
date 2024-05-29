import { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { create } from "@/http/controllers/short-urls/create"
import { get } from "@/http/controllers/short-urls/get"
import { preHandler } from "@/http/middlewares/pre-handler"
import { getShortUrlsByUserId } from "@/http/controllers/short-urls/get-short-urls-by-user-id"
import { deleteOne } from "@/http/controllers/short-urls/delete"
import { update } from "@/http/controllers/short-urls/update"
import {
  create_short_urls,
  delete_short_url,
  get_short_url_by_short_code,
  get_short_urls_by_user_id,
  update_short_url,
} from "@/schemas/short-urls"

export async function shortUrlsRoutes(app: FastifyInstance) {
  app.post(
    "/short-urls",
    { schema: create_short_urls, preHandler: [preHandler] },
    create,
  )
  app.get("/:short_code", { schema: get_short_url_by_short_code }, get)

  app.get(
    "/short-urls",
    { schema: get_short_urls_by_user_id, onRequest: [verifyJwt] },
    getShortUrlsByUserId,
  )
  app.delete(
    "/short-urls/:id",
    { schema: delete_short_url, onRequest: [verifyJwt] },
    deleteOne,
  )
  app.put(
    "/short-urls/:id",
    { schema: update_short_url, onRequest: [verifyJwt] },
    update,
  )
}

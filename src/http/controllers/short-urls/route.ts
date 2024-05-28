import { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { create } from "@/http/controllers/short-urls/create"
import { get } from "@/http/controllers/short-urls/get"
import { preHandler } from "@/http/middlewares/pre-handler"
import { getShortUrlsByUserId } from "@/http/controllers/short-urls/get-short-urls-by-user-id"
import { deleteOne } from "@/http/controllers/short-urls/delete"
import { update } from "@/http/controllers/short-urls/update"

export async function shortUrlsRoutes(app: FastifyInstance) {
  app.post("/short-urls", { preHandler: [preHandler] }, create)
  app.get("/:short_code", get)

  app.get("/short-urls", { onRequest: [verifyJwt] }, getShortUrlsByUserId)
  app.delete("/short-urls/:id", { onRequest: [verifyJwt] }, deleteOne)
  app.put("/short-urls/:id", { onRequest: [verifyJwt] }, update)
}

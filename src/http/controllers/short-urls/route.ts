import { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { create } from "@/http/controllers/short-urls/create"
import { get } from "@/http/controllers/short-urls/get"
import { preHandler } from "@/http/middlewares/pre-handler"

export async function shortUrlsRoutes(app: FastifyInstance) {
  app.post("/short-urls", { preHandler: [preHandler] }, create)
  app.get("/short-urls/:short_code", get)

  app.put("/short-urls", { onRequest: [verifyJwt] }, create)
}

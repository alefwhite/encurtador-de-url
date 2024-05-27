import { FastifyInstance } from "fastify"
import { authenticate } from "@/http/controllers/users/authenticate"
import { refresh } from "@/http/controllers/users/refresh"

export async function appRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate)
  app.patch("/token/refresh", refresh)
}

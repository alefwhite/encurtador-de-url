import { FastifyInstance } from "fastify"
import { authenticate } from "@/http/controllers/users/authenticate"
import { refresh } from "@/http/controllers/users/refresh"
import { authenticate_user, refresh_token } from "@/schemas/authenticate"

export async function appRoutes(app: FastifyInstance) {
  app.post("/sessions", { schema: authenticate_user }, authenticate)
  app.patch("/token/refresh", { schema: refresh_token }, refresh)
}

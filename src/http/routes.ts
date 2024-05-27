import { FastifyInstance } from "fastify"
import { authenticate } from "@/http/controllers/users/authenticate"

export async function appRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate)
}

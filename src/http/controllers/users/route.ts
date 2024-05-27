import { FastifyInstance } from "fastify"
import { create } from "@/http/controllers/users/create"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", create)

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, create)
}

import { FastifyInstance } from "fastify"
import { create } from "@/http/controllers/users/create"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { create_users } from "@/schemas/users"

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    "/users",
    {
      schema: create_users,
    },
    create,
  )

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, create)
}

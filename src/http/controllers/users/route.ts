import { FastifyInstance } from "fastify"
import { create } from "@/http/controllers/users/create"
import { create_users } from "@/schemas/users"

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    "/users",
    {
      schema: create_users,
    },
    create,
  )
}

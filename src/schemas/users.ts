import { FastifySchema } from "fastify"

export const create_users: FastifySchema = {
  description: "Create a new user",
  tags: ["users"],
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["name", "email", "password"],
  },
  response: {
    201: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
      },
    },
  },
}

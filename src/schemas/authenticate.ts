import { FastifySchema } from "fastify"

export const authenticate_user: FastifySchema = {
  description: "Authenticate a user",
  tags: ["auth"],
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["email", "password"],
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
    400: {
      description: "Invalid credentials.",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
}

export const refresh_token: FastifySchema = {
  description: "Refresh access token",
  tags: ["auth"],
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
    401: {
      description: "Unauthorized",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
}

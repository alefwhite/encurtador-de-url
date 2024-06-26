import fastify from "fastify"
import { ZodError } from "zod"
import { env } from "@/env"
import { usersRoutes } from "@/http/controllers/users/route"
import { useCaseErrors, statusCode } from "@/usecases/errors"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { appRoutes } from "@/http/routes"
import { shortUrlsRoutes } from "@/http/controllers/short-urls/route"

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "7d",
  },
})
app.register(import("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Documentação com Swagger",
      description: "API de Encurtador de URL",
      version: "1.0.0",
    },
  },
  swagger: {
    // properties...
    securityDefinitions: {
      Authorization: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
})
app.register(import("@fastify/swagger-ui"), {
  routePrefix: "/docs",
})
app.register(fastifyCookie)
app.register(appRoutes)
app.register(usersRoutes)
app.register(shortUrlsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  } else {
    // TODO DataDog/NewRelic/Sentry
  }

  if (useCaseErrors().includes(error.name)) {
    return reply.status(statusCode(error.name)).send({
      message: error.message,
    })
  }

  return reply.status(500).send({ message: "Internal server error." })
})

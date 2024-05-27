import fastify from "fastify"
import { ZodError } from "zod"
import { env } from "@/env"
import { usersRoutes } from "@/http/controllers/users/route"
import useCaseErrors from "@/usecases/errors"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { appRoutes } from "@/http/routes"

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(appRoutes)
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
    return reply.status(400).send({
      message: error.message,
    })
  }

  return reply.status(500).send({ message: "Internal server error." })
})

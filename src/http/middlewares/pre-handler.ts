import { FastifyReply, FastifyRequest } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

export async function preHandler(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers["authorization"]
  if (!token) {
    // Se não houver token, permite acesso anônimo
    return
  }

  try {
    await verifyJwt(request, reply)
  } catch (err) {
    // Se o token for inválido, retorna erro
    reply.code(401).send({ error: "Invalid token" })
  }
}

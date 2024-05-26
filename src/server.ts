import { app } from "./app"
import { env } from "./env"

const PORT = env.PORT
app
  .listen({
    host: env.HOST,
    port: PORT,
  })
  .then(() => console.log(`HTTP Server Running port: ${PORT}.`))

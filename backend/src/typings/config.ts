import "dotenv/config"
import z from "zod"

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  REDIS_URI: z.string(),
  SOCKET_PORT: z.coerce.number()
})

export default configSchema.parse(process.env)

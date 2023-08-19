import "dotenv/config"
import z from "zod"

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  REDIS_HOST: z.string(),
  REDIS_PASS: z.string(),
  REDIS_PORT: z.coerce.number()
})

export default configSchema.parse(process.env)

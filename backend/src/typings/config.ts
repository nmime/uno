import "dotenv/config"
import z from "zod"

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PASSWORD: z.string(),
  PORT: z.coerce.number(),
  REDIS_URI: z.string()
})

export default configSchema.parse(process.env)

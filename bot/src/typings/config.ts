import "dotenv/config"

import z from "zod"

const configSchema = z.object({
  ADMINS: z.string().transform((str) => str.split(",").map(Number)),
  BACKEND_DOMAIN: z.string(),
  BOT_TOKEN: z.string(),
  MONGO_URI: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  SECRET_KEY: z.string(),
  WEB_DOMAIN: z.string()
})

export default configSchema.parse(process.env)

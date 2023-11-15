import "dotenv/config"

import z from "zod"

const configSchema = z.object({
  ADMINS: z.string().transform((str) => str.split(",").map(Number)),
  BOT_TOKEN: z.string(),
  DOMAIN: z.string(),
  MONGO_URI: z.string(),
  NODE_ENV: z.enum(["development", "production"])
})

export default configSchema.parse(process.env)

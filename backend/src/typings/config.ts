import "dotenv/config"
import z from "zod"

const configSchema = z.object({
  BOT_TOKEN: z.string(),
  BOT_USERNAME: z.string(),
  MONGO_URI: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  REDIS_HOST: z.string(),
  REDIS_PASS: z.string(),
  REDIS_PORT: z.coerce.number(),
  REFERRAL_BONUS: z.coerce.number(),
  WALLET_PAY_KEY: z.string()
})

export default configSchema.parse(process.env)

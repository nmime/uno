import "dotenv/config"
import z from "zod"

const updates = ["message", "my_chat_member", "callback_query"] as const

const configSchema = z.object({
  ADMINS: z.string().transform((str) => str.split(",").map(Number)),
  BOT_ALLOWED_UPDATES: z.preprocess(
    (v: unknown) => {
      try {
        return JSON.parse(String(v))
      } catch (e) {
        return null
      }
    },
    z.array(z.enum(updates))
  ),
  BOT_TOKEN: z.string(),
  DOMAIN: z.string(),
  MONGO_URI: z.string(),
  NODE_ENV: z.enum(["development", "production"])
})

export default configSchema.parse(process.env)

import config from "@typings/config"
import { Context } from "@typings/context"
import { Middleware } from "grammy"

export default (): Middleware<Context> => async (ctx, next) => {
  if (config.ADMINS.includes(ctx.from.id)) await next()
  else return
}

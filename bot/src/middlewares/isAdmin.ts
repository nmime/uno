import { Middleware } from "grammy"
import { Context } from "@typings/context"
import config from "@typings/config"

export default (): Middleware<Context> => async (ctx, next) => {
  if (config.ADMINS.includes(ctx.from.id)) await next()
  else return
}

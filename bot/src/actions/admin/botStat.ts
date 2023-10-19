import { Context } from "@typings/context"

import config from "../../../config.json"

export default async function botStat(ctx: Context): Promise<void> {
  if (ctx.callbackQuery) await ctx.answerCallbackQuery()

  if (!config.botStat)
    config.botStat = {
      alive: false,
      botMan: false,
      send: false
    }
}

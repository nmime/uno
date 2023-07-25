import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"
import config from "@typings/config"

export default async function start(ctx: Context) {
  const keyboard = new InlineKeyboard().webApp("Open", config.DOMAIN)

  return ctx.reply(ctx.t("start"), { reply_markup: keyboard })
}

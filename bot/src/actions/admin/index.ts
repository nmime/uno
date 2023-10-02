import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"

export default (ctx: Context) => {
  const keyboard = new InlineKeyboard()
    .text(ctx.t("admin.statistics"), "admin_statistics")
    .text(ctx.t("admin.adRef"), "admin_adRef")

  if (ctx.message)
    return ctx.reply(ctx.t("admin"), {
      reply_markup: keyboard
    })
  else
    return ctx.editMessageText(ctx.t("admin"), {
      reply_markup: keyboard
    })
}

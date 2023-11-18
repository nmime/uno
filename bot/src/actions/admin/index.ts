import sendOrEdit from "@helpers/sendOrEdit"
import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"

export default (ctx: Context) => {
  const keyboard = new InlineKeyboard()
    .text(ctx.t("admin.statistics"), "admin_statistics")
    .text(ctx.t("admin.adRef"), "admin_adRef")
    .row()
    .text(ctx.t("admin.botStat"), "admin_botStat")

  return sendOrEdit(ctx, ctx.t("admin"), {
    reply_markup: keyboard
  })
}

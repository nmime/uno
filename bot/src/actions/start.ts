import sendOrEdit from "@helpers/sendOrEdit"
import { uploadImage } from "@helpers/uploadImage"
import config from "@typings/config"
import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"

export default async function start(ctx: Context) {
  const keyboard = new InlineKeyboard()
    .webApp(ctx.t("start.openWebApp"), `${config.WEB_DOMAIN}/`)
    .row()
    .text(ctx.t("start.profile"), "profile")
    .row()
    .switchInline(ctx.t("start.share"), "")
    .row()
    .url(
      ctx.t("start.addGroup"),
      `https://t.me/${ctx.me.username}?startgroup=startGroup`
    )

  if (ctx.callbackQuery) await ctx.answerCallbackQuery()

  await sendOrEdit(ctx, ctx.t("start"), { reply_markup: keyboard })

  return uploadImage(ctx)
}

import { uploadImage } from "@helpers/uploadImage"
import config from "@typings/config"
import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"

export default async function start(ctx: Context) {
  const keyboard = new InlineKeyboard()
    .webApp(ctx.t("start.openWebApp"), config.DOMAIN)
    .row()
    .text(ctx.t("start.profile"), "profile")
    .row()
    .url(
      ctx.t("start.addGroup"),
      `https://t.me/${ctx.me.username}?startgroup=startGroup`
    )

  if (ctx.callbackQuery)
    await ctx.editMessageText(ctx.t("start"), { reply_markup: keyboard })
  else await ctx.reply(ctx.t("start"), { reply_markup: keyboard })

  return uploadImage(ctx)
}

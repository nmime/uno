import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"
import config from "@typings/config"
import { uploadImage } from "@helpers/uploadImage"

export default async function start(ctx: Context) {
  const keyboard = new InlineKeyboard()
    .webApp(ctx.t("start.openWebApp"), config.DOMAIN)
    .row()
    .text(ctx.t("start.profile"), "profile")
    .row()
    .url(
      ctx.t("start.addGroup"),
      `https://t.me/${ctx.me.username}?startgroup=startGroup&admin=invite_users+pin_messages`
    )

  if (ctx.callbackQuery)
    await ctx.editMessageText(ctx.t("start"), { reply_markup: keyboard })
  else await ctx.reply(ctx.t("start"), { reply_markup: keyboard })

  return uploadImage(ctx)
}

import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"
import config from "@typings/config"

export default async function profile(ctx: Context) {
  const keyboard = new InlineKeyboard()
    .webApp(ctx.t("profile.key"), `${config.DOMAIN}/wallet`)
    .row()
    .text(ctx.t("back"), `start`)

  return ctx.editMessageText(
    ctx.t("profile", {
      balance: ctx.session.user.balance,
      gamesQuantity:
        ctx.session.user.statistics.win + ctx.session.user.statistics.lose,
      lose: ctx.session.user.statistics.lose,
      win: ctx.session.user.statistics.win
    }),
    { reply_markup: keyboard }
  )
}

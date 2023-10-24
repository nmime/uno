import config from "@typings/config"
import { Context } from "@typings/context"
import { InlineKeyboard } from "grammy"

export default async function profile(ctx: Context) {
  const keyboard = new InlineKeyboard()
    .webApp(
      ctx.t("profile.key"),
      `${config.DOMAIN}/${ctx.session.user.lang}/profile`
    )
    .row()
    .text(ctx.t("back"), `start`)

  return ctx.editMessageText(
    ctx.t("profile", {
      balance: ctx.session.user.balance,
      gamesQuantity:
        ctx.session.user.statistics.win + ctx.session.user.statistics.lose,
      lose: ctx.session.user.statistics.lose,
      referralAccrual: ctx.session.user.referralAccrual,
      referralCounter: ctx.session.user.referralCounter,
      referralLink: `https://t.me/${ctx.me.username}?start=reg-${ctx.from.id}`,
      win: ctx.session.user.statistics.win
    }),
    { reply_markup: keyboard }
  )
}

import { saveModifier } from "@helpers/saveModifier"
import { Context } from "@typings/context"
import { IUser, User } from "common/database"
import { defaultLocale, languages } from "common/typings/languages"
import { convertChars } from "common/utils"
import { Middleware } from "grammy"

export default (): Middleware<Context> => async (ctx, next) => {
  let user = await User.findOne({ id: ctx.from.id })

  if (!user) {
    user = new User({
      from: ctx.message.text?.split(" ")[1] || null,
      id: ctx.from.id
    })

    ctx.session.isFreshUser = true
  }

  if (!user.lang) user.lang = ctx.from.language_code
  else if (!languages.includes(user.lang)) user.lang = defaultLocale

  user = Object.assign(user, {
    languageCode: ctx.from.language_code,
    lastMessage: Date.now(),
    name: `${convertChars(ctx.from.first_name)} ${convertChars(
      ctx.from.last_name ?? ""
    )}`,
    username: ctx.from.username
  } as unknown as IUser)

  ctx.session.user = user

  ctx.i18n.useLocale(
    ctx.session.user.lang || ctx.session.user.languageCode || "ru"
  )

  await next()

  return saveModifier(user)
}

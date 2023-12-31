import { saveModifier } from "@helpers/saveModifier"
import { Context } from "@typings/context"
import { AdRef, User } from "common/database"
import { Middleware } from "grammy"

export default (): Middleware<Context> => async (ctx, next) => {
  if (ctx.chat.type !== "private" || !ctx.message) return next()

  const splitBySpace = ctx.message.text?.split(" ")
  if (!splitBySpace || splitBySpace[0] !== "/start") return next()

  await next()

  const [refSystem, refCode] = (splitBySpace[1] || "").split("-")

  if (refSystem === "ref") {
    const date = new Date()
    const newCounter = Number(ctx.session.isFreshUser || 0)
    const uniqueCounter = ctx.session.isFreshUser
      ? 1
      : ctx.session.user.from !== `ref-${refCode}`
      ? 1
      : 0

    const adRef = await AdRef.findOne({ name: refCode })
    if (adRef)
      await AdRef.updateOne(
        { name: refCode },
        {
          $addToSet: { users: ctx.from.id },
          $inc: {
            newCounter,
            total: 1,
            uniqueCounter: uniqueCounter
          },
          $set: { lastUsage: date }
        }
      )
    else
      await saveModifier(
        new AdRef({
          firstUsage: date,
          lastUsage: date,
          name: refCode,
          newCounter,
          total: 1,
          uniqueCounter: 0
        })
      )
  } else if (refSystem === "reg" && ctx.session.isFreshUser) {
    await User.updateOne({ id: refCode }, { $inc: { referralCounter: 1 } })
  }
}

import { Context } from "@typings/context"
import { User } from "common/database"
import { AdRef } from "common/database/adRef"
import { InlineKeyboard } from "grammy"

const defaultShift = 20

export default async function adRefShow(ctx: Context): Promise<void> {
  const currentRef = ctx.callbackQuery.data.split("_")[2]

  if (currentRef) {
    const result = await AdRef.findById(currentRef)

    const aliveCounter = await User.countDocuments({
      alive: true,
      from: `ref-${result.name}`
    })

    return void ctx.editMessageText(
      ctx.t("adRef", {
        aliveCounter,
        aliveCounterPercent: Math.round(
          (aliveCounter / result.newCounter) * 100
        ),
        firstUsage: result.firstUsage,
        lastUsage: result.lastUsage,
        link: `https://t.me/${ctx.me.username}?start=ref-${result.name}`,
        name: result.name,
        newCounter: result.newCounter,
        newCounterPercent: Math.round(
          (result.newCounter / result.uniqueCounter) * 100
        ),
        total: result.total,
        uniqueCounter: result.uniqueCounter,
        uniqueCounterPercent: Math.round(
          (result.uniqueCounter / result.total) * 100
        )
      }),
      {
        reply_markup: new InlineKeyboard()
          .text(ctx.t("update"), `admin_adRef_${currentRef}`)
          .row()
          .text(ctx.t("back"), "admin_adRef")
      }
    )
  }

  const shift = isNaN(Number(currentRef)) ? 0 : Number(currentRef)
  const count = await AdRef.countDocuments()

  if (!count)
    return void ctx.editMessageText(
      ctx.t("adRef.empty", { botUsername: ctx.me.username }),
      {
        reply_markup: new InlineKeyboard().text(ctx.t("back"), "admin")
      }
    )

  if (shift < 0 || shift >= count)
    return void ctx.answerCallbackQuery(ctx.t("adRef.cant"))
  await ctx.answerCallbackQuery()

  const adRefs = await AdRef.find()
    .skip(shift)
    .limit(defaultShift)
    .sort({ _id: -1 })

  await ctx.editMessageText(
    ctx.t("adRef.list", {
      list: adRefs
        .map((ref) =>
          ctx.t("adRef.listPoint", {
            name: ref.name,
            total: ref.total,
            uniqueCounter: ref.uniqueCounter
          })
        )
        .join("\n")
    }),
    {
      reply_markup: InlineKeyboard.from([
        ...adRefs.map((ref) => [
          InlineKeyboard.text(ref.name, `admin_adRef_${String(ref._id)}`)
        ]),
        [
          InlineKeyboard.text("◀️", `admin_adRef_${shift - defaultShift}`),
          InlineKeyboard.text(
            `${shift + adRefs.length}/${count} 🔄`,
            `admin_adRef_${shift}`
          ),
          InlineKeyboard.text("▶️", `admin_adRef_${shift + defaultShift}`)
        ],
        [InlineKeyboard.text(ctx.t("back"), "admin")]
      ])
    }
  )
}

import { Context } from "@typings/context"
import { AdRef } from "common/database/adRef"
import { InlineKeyboard } from "grammy"

const defaultShift = 20

export default async function adRefShow(ctx: Context): Promise<void> {
  const currentRef = ctx.callbackQuery.data.split("_")[2]

  if (currentRef) {
    return void ctx.editMessageText(ctx.t("adRef"))
  }

  const shift = Number(currentRef)
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
      list: adRefs.map((ref) => `${ref.name}: ${ref.total}`).join("\n")
    }),
    {
      reply_markup: InlineKeyboard.from([
        ...adRefs.map((ref) => [
          InlineKeyboard.text(ref.name, `admin_adRef_${String(ref._id)}`)
        ]),
        [
          InlineKeyboard.text("◀️", `admin_sysRef_${shift - defaultShift}`),
          InlineKeyboard.text(
            `${shift + adRefs.length}/${count} 🔄`,
            `admin_sysRef_${shift}`
          ),
          InlineKeyboard.text("▶️", `admin_sysRef_${shift + defaultShift}`)
        ],
        [InlineKeyboard.text(ctx.t("back"), "admin")]
      ])
    }
  )
}

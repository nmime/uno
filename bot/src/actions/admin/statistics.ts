import { Context } from "@typings/context"
import { User } from "common/database"
import { InlineKeyboard } from "grammy"

interface LangAggregationResult {
  _id: string
  count: number
}

export default async function statistics(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery(ctx.t("statistics.getting"))

  const now = new Date(),
    today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    ),
    yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      0,
      0,
      0,
      0
    ),
    week = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7,
      0,
      0,
      0,
      0
    ),
    month = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 30,
      0,
      0,
      0,
      0
    )

  const results: Promise<number>[] = [
    User.countDocuments(),
    User.countDocuments({ alive: true }),
    User.countDocuments({
      $or: [{ from: null }, { from: { $exists: false } }],
      alive: true
    }),

    User.countDocuments({ alive: true, lastMessage: { $gte: today } }),
    User.countDocuments({ alive: true, lastMessage: { $gte: week } }),
    User.countDocuments({ alive: true, lastMessage: { $gte: month } }),

    User.countDocuments({ createdAt: { $gte: today } }),
    User.countDocuments({ alive: true, createdAt: { $gte: today } }),
    User.countDocuments({
      $or: [{ from: null }, { from: { $exists: false } }],
      alive: true,
      createdAt: { $gte: today }
    }),

    User.countDocuments({ createdAt: { $gte: yesterday, $lte: today } }),
    User.countDocuments({
      alive: true,
      createdAt: { $gte: yesterday, $lte: today }
    }),
    User.countDocuments({
      $or: [{ from: null }, { from: { $exists: false } }],
      alive: true,
      createdAt: { $gte: yesterday, $lte: today }
    }),

    User.countDocuments({ createdAt: { $gte: month } }),
    User.countDocuments({ alive: true, createdAt: { $gte: month } }),
    User.countDocuments({
      $or: [{ from: null }, { from: { $exists: false } }],
      alive: true,
      createdAt: { $gte: month }
    })
  ]

  const [
    all,
    alive,
    withoutRef,
    dau,
    wau,
    mau,
    forDay,
    aliveForDay,
    withoutRefForDay,
    forYesterday,
    aliveForYesterday,
    withoutRefForYesterday,
    forMonth,
    aliveForMonth,
    withoutRefForMonth
  ] = await Promise.all(results)

  const langCodes: LangAggregationResult[] = await User.aggregate([
    { $match: { alive: true } },
    { $group: { _id: "$languageCode", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ])
  const langCodesString = langCodes
    .filter((lang) => lang.count > langCodes[0].count / 100 && lang._id)
    .map((lang) =>
      ctx.t("statistics.langCode", {
        code: lang._id?.toUpperCase(),
        count: lang.count,
        percent: Math.round((lang.count / alive) * 100)
      })
    )
    .join(", ")

  await ctx.editMessageText(
    ctx.t("statistics", {
      alive,
      aliveForDay,
      aliveForMonth,
      aliveForYesterday,
      alivePercent: Math.round((alive / all) * 100),
      all,
      dau,
      dauPercent: Math.round((dau / wau) * 100),
      forDay,
      forMonth,
      forYesterday,
      langCodesString,
      mau,
      mauPercent: Math.round((mau / alive) * 100),
      wau,
      wauPercent: Math.round((wau / mau) * 100),
      withoutRef,
      withoutRefForDay,
      withoutRefForMonth,
      withoutRefForYesterday,
      withoutRefPercent: Math.round((withoutRef / alive) * 100)
    }),
    {
      reply_markup: new InlineKeyboard()
        .text(ctx.t("update"), "admin_statistics")
        .row()
        .text(ctx.t("back"), "admin")
    }
  )
}

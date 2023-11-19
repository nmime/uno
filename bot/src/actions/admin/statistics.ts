import updateAliveEntities from "@services/updateAliveEntities"
import { Context } from "@typings/context"
import { Game, Group, User } from "common/database"
import { InlineKeyboard } from "grammy"

interface LangAggregationResult {
  _id: string
  count: number
}

export default async function statistics(ctx: Context): Promise<void> {
  const data = ctx.callbackQuery.data.split("_")

  if (data[2] === "update") {
    await ctx.answerCallbackQuery({
      show_alert: true,
      text: ctx.t("statistics.updating")
    })

    updateAliveEntities(ctx.api, false)
      .then(() => {})
      .catch(() => {})

    return
  }

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

    User.countDocuments({ alive: true, lastActivity: { $gte: today } }),
    User.countDocuments({
      alive: true,
      lastActivity: { $gte: yesterday, $lte: today }
    }),
    User.countDocuments({ alive: true, lastActivity: { $gte: week } }),
    User.countDocuments({ alive: true, lastActivity: { $gte: month } }),

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

    User.countDocuments({ createdAt: { $gte: week } }),
    User.countDocuments({ alive: true, createdAt: { $gte: week } }),
    User.countDocuments({
      $or: [{ from: null }, { from: { $exists: false } }],
      alive: true,
      createdAt: { $gte: week }
    }),

    User.countDocuments({ createdAt: { $gte: month } }),
    User.countDocuments({ alive: true, createdAt: { $gte: month } }),
    User.countDocuments({
      $or: [{ from: null }, { from: { $exists: false } }],
      alive: true,
      createdAt: { $gte: month }
    }),

    Group.countDocuments(),
    Group.countDocuments({ alive: true }),

    Group.countDocuments({ alive: true, lastActivity: { $gte: today } }),
    Group.countDocuments({
      alive: true,
      lastActivity: { $gte: yesterday, $lte: today }
    }),
    Group.countDocuments({ alive: true, lastActivity: { $gte: week } }),
    Group.countDocuments({ alive: true, lastActivity: { $gte: month } }),

    Group.countDocuments({ createdAt: { $gte: today } }),
    Group.countDocuments({ alive: true, createdAt: { $gte: today } }),

    Group.countDocuments({ createdAt: { $gte: yesterday, $lte: today } }),
    Group.countDocuments({
      alive: true,
      createdAt: { $gte: yesterday, $lte: today }
    }),

    Group.countDocuments({ createdAt: { $gte: week } }),
    Group.countDocuments({ alive: true, createdAt: { $gte: week } }),

    Group.countDocuments({ createdAt: { $gte: month } }),
    Group.countDocuments({ alive: true, createdAt: { $gte: month } }),

    Game.countDocuments({ status: "started" }),
    Game.countDocuments({ status: "ended" }),
    Game.countDocuments({ status: "surrender" }),

    Game.countDocuments({ createdAt: { $gte: today }, status: "started" }),
    Game.countDocuments({ createdAt: { $gte: yesterday }, status: "started" }),
    Game.countDocuments({ createdAt: { $gte: week }, status: "started" }),
    Game.countDocuments({ createdAt: { $gte: month }, status: "started" })
  ]

  const [
    all,
    alive,
    withoutRef,
    dau,
    yau,
    wau,
    mau,
    forDay,
    aliveForDay,
    withoutRefForDay,
    forYesterday,
    aliveForYesterday,
    withoutRefForYesterday,
    forWeek,
    aliveForWeek,
    withoutRefForWeek,
    forMonth,
    aliveForMonth,
    withoutRefForMonth,
    allGroups,
    aliveGroups,
    dauGroups,
    yauGroups,
    wauGroups,
    mauGroups,
    forDayGroups,
    aliveForDayGroups,
    forYesterdayGroups,
    aliveForYesterdayGroups,
    forWeekGroups,
    aliveForWeekGroups,
    forMonthGroups,
    aliveForMonthGroups,
    gameStarted,
    gameEnded,
    gameSurrender,
    gameForDay,
    gameForYesterday,
    gameForWeek,
    gameForMonth
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
      aliveForDayGroups,
      aliveForMonth,
      aliveForMonthGroups,
      aliveForWeek,
      aliveForWeekGroups,
      aliveForYesterday,
      aliveForYesterdayGroups,
      aliveGroups,
      alivePercent: Math.round((alive / all) * 100),
      alivePercentGroups: Math.round((aliveGroups / allGroups) * 100),
      all,
      allGroups,
      dau,
      dauGroups,
      dauPercent: Math.round((dau / yau) * 100),
      dauPercentGroups: Math.round((dauGroups / yauGroups) * 100),
      forDay,
      forDayGroups,
      forMonth,
      forMonthGroups,
      forWeek,
      forWeekGroups,
      forYesterday,
      forYesterdayGroups,
      gameEnded: gameEnded + gameSurrender,
      gameForDay,
      gameForMonth,
      gameForWeek,
      gameForYesterday,
      gameNow: gameStarted - gameEnded - gameSurrender,
      gameStarted,
      langCodesString,
      mau,
      mauGroups,
      mauPercent: Math.round((mau / alive) * 100),
      mauPercentGroups: Math.round((mauGroups / aliveGroups) * 100),
      wau,
      wauGroups,
      wauPercent: Math.round((wau / mau) * 100),
      wauPercentGroups: Math.round((wauGroups / mauGroups) * 100),
      withoutRef,
      withoutRefForDay,
      withoutRefForMonth,
      withoutRefForWeek,
      withoutRefForYesterday,
      withoutRefPercent: Math.round((withoutRef / alive) * 100),
      yau,
      yauGroups,
      yauPercent: Math.round((yau / wau) * 100),
      yauPercentGroups: Math.round((yauGroups / wauGroups) * 100)
    }),
    {
      reply_markup: new InlineKeyboard()
        .text(ctx.t("update"), "admin_statistics")
        .row()
        .text(ctx.t("statistics.update"), "admin_statistics_update")
        .row()
        .text(ctx.t("back"), "admin")
    }
  )
}

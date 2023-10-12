import adRefShow from "@actions/admin/adRef"
import statistics from "@actions/admin/statistics"
import profile from "@actions/profile"
import uno from "@actions/uno"
import { conversations } from "@grammyjs/conversations"
import { hydrate } from "@grammyjs/hydrate"
import { hydrateReply, parseMode } from "@grammyjs/parse-mode"
import { run, sequentialize } from "@grammyjs/runner"
import adRef from "@middlewares/adRef"
import isAdmin from "@middlewares/isAdmin"
import setGroup from "@middlewares/setGroup"
import setUser from "@middlewares/setUser"
import config from "@typings/config"
import { Context, SessionData } from "@typings/context"
import { Bot, session } from "grammy"
import { connect } from "mongoose"
import { generateUpdateMiddleware } from "telegraf-middleware-console-time"

import admin from "./actions/admin"
import language from "./actions/language"
import start from "./actions/start"
import { i18n } from "./i18n"

const bot = new Bot<Context>(config.BOT_TOKEN)

bot.catch((err) => console.error(err))

bot.use(i18n)

if (config.NODE_ENV === "development") bot.use(generateUpdateMiddleware())
bot.use(hydrateReply)
bot.use(hydrate())
bot.api.config.use(parseMode("HTML"))
bot.use(sequentialize((ctx: Context) => ctx.chat?.id.toString()))
bot.use(session({ initial: (): SessionData => ({}) }))
bot.use(conversations())

const privateBot = bot.chatType("private")

privateBot.use(setUser())
privateBot.use(adRef())

privateBot.command("start", start)

privateBot.use(language)
privateBot.command(["language", "lang"], (ctx) =>
  ctx.reply(ctx.t("language"), { reply_markup: language })
)

privateBot.command("admin", isAdmin(), admin)
privateBot.callbackQuery(/statistics/, isAdmin(), statistics)
privateBot.callbackQuery(/adRef/, isAdmin(), adRefShow)
privateBot.callbackQuery(/admin/, isAdmin(), admin)

privateBot.callbackQuery("start", start)
privateBot.callbackQuery("profile", profile)

privateBot.on("message", start)

const groupBot = bot.chatType(["group", "supergroup"])

groupBot.use(setGroup())
groupBot.command("uno", uno)

run(bot, {
  runner: { fetch: { allowed_updates: config.BOT_ALLOWED_UPDATES } }
})

bot
  .init()
  .then(() => console.log(bot.botInfo))
  .catch((err) => console.error(err))

connect(config.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err))

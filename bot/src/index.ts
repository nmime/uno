import config from "@typings/config"

import { connect } from "mongoose"
import { conversations } from "@grammyjs/conversations"
import { hydrate } from "@grammyjs/hydrate"
import { hydrateReply, parseMode } from "@grammyjs/parse-mode"
import { run, sequentialize } from "@grammyjs/runner"
import { Bot, session } from "grammy"
import { generateUpdateMiddleware } from "telegraf-middleware-console-time"

import { Context, SessionData } from "@typings/context"
import { i18n } from "./i18n"
import start from "./actions/start"
import language from "./actions/language"
import uno from "@actions/uno"
import profile from "@actions/profile"
import setUser from "@middlewares/setUser"
import setGroup from "@middlewares/setGroup"

connect(config.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err))

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

privateBot.command("start", start)
privateBot.command(["language", "lang"], (ctx) =>
  ctx.reply(ctx.t("language"), { reply_markup: language })
)

privateBot.callbackQuery("start", start)
privateBot.callbackQuery("profile", profile)

privateBot.on("message", start)

const groupBot = bot.chatType(["group", "supergroup"])

groupBot.use(setGroup())
groupBot.command("uno", uno)

run(bot, {
  runner: { fetch: { allowed_updates: config.BOT_ALLOWED_UPDATES } }
})

void (async () => {
  await bot.init()
  console.log("BOT successful started")
})()

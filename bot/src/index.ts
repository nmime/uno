import adRefShow from "@actions/admin/adRef"
import botStat, { botStatConversation } from "@actions/admin/botStat"
import statistics from "@actions/admin/statistics"
import deleteEvent from "@actions/deleteEvent"
import inlineShare from "@actions/inlineShare"
import myChatMember from "@actions/myChatMember"
import profile from "@actions/profile"
import uno from "@actions/uno"
import { conversations, createConversation } from "@grammyjs/conversations"
import { hydrate } from "@grammyjs/hydrate"
import { hydrateReply, parseMode } from "@grammyjs/parse-mode"
import { run, sequentialize } from "@grammyjs/runner"
import adRef from "@middlewares/adRef"
import isAdmin from "@middlewares/isAdmin"
import setGroup from "@middlewares/setGroup"
import setUser from "@middlewares/setUser"
import { autoQuote } from "@roziscoding/grammy-autoquote"
import updateAliveEntities from "@services/updateAliveEntities"
import { updateCommands } from "@services/updateCommands"
import { updateDescriptions } from "@services/updateDescriptions"
import config from "@typings/config"
import { Context, SessionData } from "@typings/context"
import { randomInt } from "crypto"
import { Bot, session } from "grammy"
import { connect } from "mongoose"
import { AsyncTask, CronJob, ToadScheduler } from "toad-scheduler"

import admin from "./actions/admin"
import language from "./actions/language"
import start from "./actions/start"
import { i18n } from "./i18n"

const bot = new Bot<Context>(
  config.BOT_TOKEN,
  config.NODE_ENV === "development"
    ? {
        client: {
          buildUrl: (root, token, method) =>
            `${root}/bot${token}/test/${method}`
        }
      }
    : {}
)

bot.catch((err) => console.error(err))

bot.use(i18n)

bot.use(autoQuote)
bot.use(hydrateReply)
bot.use(hydrate())
bot.api.config.use(parseMode("HTML"))
bot.use(sequentialize((ctx: Context) => String(ctx.chat?.id)))
bot.use(session({ initial: (): SessionData => ({}) }))
bot.use(conversations())
bot.on("my_chat_member", myChatMember)
bot.on("inline_query", inlineShare)

const privateBot = bot.chatType("private")

privateBot.use(setUser())
privateBot.use(adRef())
privateBot.use(createConversation(botStatConversation))

privateBot.command("start", start)

privateBot.use(language)
privateBot.command(["language", "lang"], (ctx) =>
  ctx.reply(ctx.t("language"), { reply_markup: language })
)

privateBot.command("updateCommands", isAdmin(), updateCommands)
privateBot.command("updateDescriptions", isAdmin(), updateDescriptions)

privateBot.command("admin", isAdmin(), admin)
privateBot.callbackQuery(/statistics/, isAdmin(), statistics)
privateBot.callbackQuery(/adRef/, isAdmin(), adRefShow)
privateBot.callbackQuery(/botStat/, isAdmin(), botStat)
privateBot.callbackQuery(/admin/, isAdmin(), admin)

privateBot.callbackQuery("start", start)
privateBot.callbackQuery("profile", profile)

privateBot.on("message", start)

const groupBot = bot.chatType(["group", "supergroup"])

groupBot.use(setGroup())

groupBot.on(
  [
    ":new_chat_members",
    ":left_chat_member",
    ":new_chat_title",
    ":pinned_message",
    ":new_chat_photo",
    ":delete_chat_photo"
  ],
  deleteEvent
)

groupBot.command("uno", uno)
groupBot.callbackQuery("uno", uno)

const runner = run(bot, {
  runner: {
    fetch: {
      allowed_updates: [
        "message",
        "my_chat_member",
        "callback_query",
        "inline_query"
      ]
    }
  }
})

const stopRunner = () => runner.isRunning() && runner.stop()

/* eslint-disable @typescript-eslint/no-misused-promises */
process.once("SIGINT", stopRunner)
process.once("SIGTERM", stopRunner)

bot
  .init()
  .then(() => console.log(bot.botInfo))
  .catch((err) => console.error(err))

connect(config.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err))

const scheduler = new ToadScheduler()

scheduler.addCronJob(
  new CronJob(
    {
      cronExpression: `0 ${randomInt(2, 6)} * * *`
    },
    new AsyncTask("updateStatistics", () => updateAliveEntities(bot.api)),
    {
      preventOverrun: true
    }
  )
)

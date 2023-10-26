import { Conversation } from "@grammyjs/conversations"
import { Context } from "@typings/context"
import { promises as fs } from "fs"
import { InlineKeyboard } from "grammy"

import config from "../../../config.json"

type botStat = {
  alive: boolean
  botMan: boolean
  key: string
  send: boolean
}

function sendBotStat(ctx: Context, botStat: botStat) {
  const keyboard = new InlineKeyboard()
    .text(
      `${ctx.t("botStat.send")} ${botStat.send ? "✅" : "❌"}`,
      `admin_botStat_send`
    )
    .text(ctx.t("botStat.key"), "admin_botStat_token")
    .row()
    .text(
      `${ctx.t("botStat.botMan")} ${botStat.botMan ? "✅" : "❌"}`,
      `admin_botStat_send`
    )
    .text(
      `${ctx.t("botStat.alive")} ${botStat.alive ? "✅" : "❌"}`,
      `admin_botStat_send`
    )
    .row()
    .text(ctx.t("back"), "admin_botStat")

  if (ctx.message)
    return ctx.reply(ctx.t("botStat"), { reply_markup: keyboard })
  else return ctx.editMessageText(ctx.t("botStat"), { reply_markup: keyboard })
}

export async function botStatConversation(
  conversation: Conversation<Context>,
  ctx: Context
) {
  await ctx.editMessageText(ctx.t("botStat.enter"), {
    reply_markup: new InlineKeyboard().text(ctx.t("back"), "admin_botStat")
  })

  const newContext = await conversation.wait()

  if (newContext.message?.text) {
    config.botStat.key = ctx.message.text

    await fs.writeFile("config.json", JSON.stringify(config, null, "  "))
  }

  await sendBotStat(ctx, config.botStat as unknown as botStat)
}

export default async function botStat(ctx: Context): Promise<void> {
  if (ctx.callbackQuery) await ctx.answerCallbackQuery()

  if (!config.botStat)
    config.botStat = {
      alive: false,
      botMan: false,
      key: "",
      send: false
    }

  const data = ctx.callbackQuery.data.split("_")
  if (data[2] === "key") await ctx.conversation.enter("botStatConversation")
  else if (typeof data[2] !== "undefined" && data[2] !== "key") {
    if (data[2] === "alive") config.botStat.alive = !config.botStat.alive
    if (data[2] === "send") config.botStat.send = !config.botStat.send
    if (data[2] === "botMan") config.botStat.botMan = !config.botStat.botMan

    await fs.writeFile("config.json", JSON.stringify(config, null, "  "))
  }

  return void sendBotStat(ctx, config.botStat as unknown as botStat)
}

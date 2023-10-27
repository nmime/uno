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

function sendBotStat(ctx: Context, botStat: botStat, send: boolean = false) {
  const keyboard = new InlineKeyboard()
    .text(
      `${ctx.t("botStat.send")} ${botStat.send ? "✅" : "❌"}`,
      `admin_botStat_send`
    )
    .row()
    .text(ctx.t("botStat.key"), "admin_botStat_key")
    .row()
    .text(
      `${ctx.t("botStat.botMan")} ${botStat.botMan ? "✅" : "❌"}`,
      `admin_botStat_botMan`
    )
    .row()
    .text(
      `${ctx.t("botStat.alive")} ${botStat.alive ? "✅" : "❌"}`,
      `admin_botStat_alive`
    )
    .row()
    .text(ctx.t("back"), "admin")

  const text = ctx.t("botStat", { botStatKey: botStat.key })

  if (ctx.message || send)
    return ctx.reply(text, {
      disable_web_page_preview: true,
      reply_markup: keyboard
    })
  else
    return ctx.editMessageText(text, {
      disable_web_page_preview: true,
      reply_markup: keyboard
    })
}

export async function botStatConversation(
  conversation: Conversation<Context>,
  ctx: Context
) {
  await ctx.editMessageText(ctx.t("botStat.enter"), {
    reply_markup: new InlineKeyboard().text(ctx.t("back"), "admin_botStat")
  })

  const { message } = await conversation.waitFor("message:text")

  if (message?.text) {
    config.botStat.key = message.text

    await conversation.external(() =>
      fs.writeFile("config.json", JSON.stringify(config, null, "  "))
    )
  }

  return sendBotStat(ctx, config.botStat as unknown as botStat, true)
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

  if (data[2] === "key") return ctx.conversation.enter("botStatConversation")
  else if (typeof data[2] !== "undefined" && data[2] !== "key") {
    if (data[2] === "alive") config.botStat.alive = !config.botStat.alive
    if (data[2] === "send") config.botStat.send = !config.botStat.send
    if (data[2] === "botMan") config.botStat.botMan = !config.botStat.botMan

    await fs.writeFile("config.json", JSON.stringify(config, null, "  "))
  }

  return void sendBotStat(ctx, config.botStat as unknown as botStat)
}

import { Other } from "@grammyjs/hydrate"
import { Context, GroupContext } from "@typings/context"

export default async function sendOrEdit(
  ctx: Context | GroupContext,
  text: string,
  extra?:
    | Other<"editMessageText", "chat_id" | "message_id" | "text">
    | Other<"sendMessage">,
  deleteMessage: boolean = false
) {
  if (deleteMessage) await ctx.deleteMessage()

  if (ctx.callbackQuery && !deleteMessage)
    return ctx.editMessageText(text, extra).catch(() => {})
  else return ctx.reply(text, extra)
}

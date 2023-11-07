import { Context } from "@typings/context"
import {
  InlineKeyboard,
  InlineQueryContext,
  InlineQueryResultBuilder
} from "grammy"
import ShortUniqueId from "short-unique-id"

export default async function inlineShare(ctx: InlineQueryContext<Context>) {
  const uid = new ShortUniqueId({ length: 9 })
  const id = uid.rnd()

  const result = InlineQueryResultBuilder.article(
    "0",
    ctx.t("inlineShare.title"),
    {
      reply_markup: new InlineKeyboard().url(
        ctx.t("inlineShare.key"),
        `https://t.me/${ctx.me.username}/game?startapp=${id}_private&startApp=${id}_private`
      )
    }
  ).text(ctx.t("inlineShare"))

  return ctx.answerInlineQuery([result], { cache_time: 3600 })
}

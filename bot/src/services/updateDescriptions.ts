import { Context } from "@typings/context"
import { CommandContext } from "grammy"

import { i18n } from "@/i18n"

export async function updateDescriptions(ctx: CommandContext<Context>) {
  let requests = i18n.locales.map((code) =>
    ctx.api.setMyDescription(i18n.t(code, "description"), {
      language_code: code
    })
  )

  requests = requests.concat(
    i18n.locales.map((code) =>
      ctx.api.setMyShortDescription(i18n.t(code, "shortDescription"), {
        language_code: code
      })
    )
  )

  await Promise.all(requests)

  return ctx.reply(ctx.t("updateDescriptions"))
}

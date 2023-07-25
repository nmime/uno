import { Menu, MenuFlavor, MenuRange } from "@grammyjs/menu"

import { i18n } from "@/i18n"
import { Context } from "@typings/context"
import start from "./start"

export default new Menu<Context>("language").dynamic(
  (ctx: Context, range: MenuRange<Context>) => {
    i18n.locales.map((localeCode: string) => {
      range
        .text(i18n.t(localeCode, "name"), async (ctx: Context & MenuFlavor) => {
          if (ctx.session.user) ctx.session.user.lang = localeCode
          ctx.i18n.useLocale(localeCode)

          ctx.menu.close()
          await ctx.editMessageText(ctx.t("language.changed"))

          return start(ctx)
        })
        .row()
    })

    return range
  }
)

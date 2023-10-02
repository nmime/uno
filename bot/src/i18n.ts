import { I18n } from "@grammyjs/i18n"
import { Context } from "@typings/context"

export const i18n = new I18n<Context>({
  defaultLocale: "ru",
  directory: "locales",
  fluentBundleOptions: {
    useIsolating: false
  }
})

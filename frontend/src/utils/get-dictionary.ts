import "server-only"

import type {Locale} from "#/i18n-config"

const dictionaries = {
  ru: () => import("@public/locales/ru.json").then((module) => module.default),
  en: () => import("@public/locales/en.json").then((module) => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

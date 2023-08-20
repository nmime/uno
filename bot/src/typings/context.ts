import { type ConversationFlavor } from "@grammyjs/conversations"
import { HydrateFlavor } from "@grammyjs/hydrate"
import { I18nFlavor } from "@grammyjs/i18n"
import type { ParseModeFlavor } from "@grammyjs/parse-mode"
import { ChatTypeContext, Context as Default, SessionFlavor } from "grammy"

import { IGroup, IUser } from "common/database"

export interface SessionData {
  user?: IUser
  group?: IGroup
}

type CustomContext = Default & I18nFlavor

export type Context = ParseModeFlavor<
  HydrateFlavor<
    CustomContext &
      ChatTypeContext<CustomContext, "private"> &
      SessionFlavor<SessionData> &
      ConversationFlavor
  >
>

export type GroupContext = ParseModeFlavor<
  HydrateFlavor<
    CustomContext &
      ChatTypeContext<CustomContext, "supergroup" | "group"> &
      SessionFlavor<SessionData> &
      ConversationFlavor
  >
>

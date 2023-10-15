import { type ConversationFlavor } from "@grammyjs/conversations"
import { HydrateFlavor } from "@grammyjs/hydrate"
import { I18nFlavor } from "@grammyjs/i18n"
import type { ParseModeFlavor } from "@grammyjs/parse-mode"
import { IGroup, IUser } from "common/database"
import { ChatTypeContext, Context as Default, SessionFlavor } from "grammy"

export interface SessionData {
  user?: IUser
  group?: IGroup
  isFreshUser?: boolean
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

export type GeneralContext = ParseModeFlavor<
  HydrateFlavor<CustomContext & SessionFlavor<SessionData> & ConversationFlavor>
>

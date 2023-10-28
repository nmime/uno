import config from "@typings/config"
import { Context } from "@typings/context"
import { User } from "common/database"
import { CommandContext } from "grammy"
import { BotCommand } from "grammy/types"

import { i18n } from "@/i18n"

function getLanguageCommand(localeCode: string): BotCommand[] {
  return [
    {
      command: "language",
      description: i18n.t(localeCode, "commands.language")
    }
  ]
}

function getPrivateChatCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: "start",
      description: i18n.t(localeCode, "commands.start")
    }
  ]
}

function getPrivateChatAdminCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: "admin",
      description: i18n.t(localeCode, "commands.admin")
    }
  ]
}

function getGroupChatCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: "uno",
      description: i18n.t(localeCode, "commands.uno")
    }
  ]
}

export async function updateCommands(ctx: CommandContext<Context>) {
  let requests = i18n.locales.map((code) =>
    ctx.api.setMyCommands(
      [...getPrivateChatCommands(code), ...getLanguageCommand(code)],
      {
        language_code: code,
        scope: {
          type: "all_private_chats"
        }
      }
    )
  )

  requests = requests.concat(
    i18n.locales.map((code) =>
      ctx.api.setMyCommands(getGroupChatCommands(code), {
        language_code: code,
        scope: {
          type: "all_group_chats"
        }
      })
    )
  )

  await Promise.all(requests)

  for (const botAdmin of config.ADMINS) {
    const admin = await User.findOne({ id: botAdmin })

    await ctx.api.setMyCommands(
      [
        ...getPrivateChatCommands(admin.lang),
        ...getPrivateChatAdminCommands(admin.lang),
        ...getLanguageCommand(admin.lang)
      ],
      {
        language_code: admin.lang,
        scope: {
          type: "all_private_chats"
        }
      }
    )
  }

  return ctx.reply(ctx.t("updateCommands"))
}

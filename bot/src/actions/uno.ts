import sendOrEdit from "@helpers/sendOrEdit"
import config from "@typings/config"
import { GroupContext } from "@typings/context"
import axios from "axios"
import { maxPlayers, Metadata, minPlayers } from "common"
import { convertChars } from "common/utils"
import { InlineKeyboard } from "grammy"
import ShortUniqueId from "short-unique-id"

interface GameInfo {
  clients: number
  createdAt: string
  maxClients: number | null
  metadata: Metadata
  name: string
  processId: string
  roomId: string
}

export default async function uno(ctx: GroupContext) {
  if (ctx.callbackQuery) await ctx.answerCallbackQuery()

  let id = ctx.session.group.gameId
  if (!id) {
    const uid = new ShortUniqueId({ length: 9 })

    id = uid.rnd()
  }

  ctx.session.group.gameId = id

  let game: GameInfo | null = null

  try {
    const response = await axios.get(
      `${config.BACKEND_DOMAIN}/getGameById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${config.SECRET_KEY}`
        }
      }
    )

    game = response.data as GameInfo
  } catch (error) {
    /* empty */
  }

  if (!game)
    game = {
      metadata: {
        bet: 10,
        creatorId: ctx.from.id,
        creatorName: convertChars(ctx.from.first_name),
        maxPlayers: maxPlayers,
        minPlayers: minPlayers,
        playersCount: 0,
        status: "waiting"
      },
      roomId: id
    } as unknown as GameInfo

  const keyboard = new InlineKeyboard()
    .url(
      ctx.t("uno.key"),
      `https://t.me/${ctx.me.username}/game?startapp=${id}_private&startApp=${id}_private`
    )
    .row()
    .text(ctx.t("uno.update"), "uno")

  return sendOrEdit(
    ctx,
    ctx.t("uno", {
      bet: game.metadata.bet,
      maxPlayers: game.metadata.maxPlayers,
      playersCount: game.metadata.playersCount,
      status: ctx.t(`uno.${game.metadata.status}`)
    }),
    { reply_markup: keyboard }
  )
}

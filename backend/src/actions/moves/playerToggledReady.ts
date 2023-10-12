import { MoveContext } from "@actions/onMessage"
import { findUser } from "@helpers/findUser"
import { sendError } from "@helpers/send"
import { startGame } from "@helpers/startGame"
import { updateMetadata } from "@helpers/updateMetadata"
import { PlayerDataClass } from "common"

export async function playerToggledReady({
  client,
  player,
  room
}: MoveContext): Promise<void> {
  if (room.state.status === "playing") return sendError(client, "notStarted")

  if (!player) {
    const result = await findUser(client.userData.id)

    if (result.balance < room.state.bet || !result)
      return sendError(client, "notEnoughBalance")

    const player = new PlayerDataClass()
    player.info.id = client.userData.id
    player.info.name = client.userData.name
    player.info.language = client.userData.language
    player.ready = true
    player.status = "online"
    player.isFirstGame = result.statistics.win + result.statistics.lose === 0
    player.referrerId =
      !result.from || isNaN(Number(result.from.split("-")[1]))
        ? undefined
        : Number(result.from.split("-")[1])

    room.state.players.set(String(client.userData.id), player)
  } else {
    player.ready = !player.ready
    room.state.players.set(String(client.userData.id), player)
  }

  updateMetadata(room)

  if (
    Array.from(room.state.players.values()).filter((p) => p.ready).length ===
      room.state.visitors.size &&
    room.state.players.size > 1
  )
    return void startGame(room)
}

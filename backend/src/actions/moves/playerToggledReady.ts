import { PlayerDataClass } from "common"
import { startGame } from "@helpers/startGame"
import { MoveContext } from "@actions/onMessage"
import { updateMetadata } from "@helpers/updateMetadata"
import { sendError } from "@helpers/send"
import { findUser } from "@helpers/findUser"

export async function playerToggledReady({
  client,
  player,
  room
}: MoveContext): Promise<void> {
  if (room.state.status === "playing") return sendError(client, "notStarted")

  if (!player) {
    const result = await findUser(client.userData.id)

    if (result.balance < room.state.bet)
      return sendError(client, "notEnoughBalance")

    const player = new PlayerDataClass()
    player.info.id = client.userData.id
    player.info.name = client.userData.name
    player.info.language = client.userData.language
    player.ready = true
    player.status = "online"

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

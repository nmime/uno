import { MoveContext } from "@actions/onMessage"
import { clearTimer } from "@helpers/clearTimer"
import { findUser } from "@helpers/findUser"
import { sendError } from "@helpers/send"
import { setTimer } from "@helpers/setTimer"
import { startGame } from "@helpers/startGame"
import { updateMetadata } from "@helpers/updateMetadata"
import { PlayerDataClass } from "common"

export async function playerToggledReady({
  client,
  player,
  room
}: MoveContext): Promise<void> {
  if (room.state.status === "playing") return sendError(client, "notStarted")

  const result = await findUser(client.userData.id)
  if (result.balance < room.state.bet || !result)
    return sendError(client, "notEnoughBalance")

  if (!player) {
    const player = new PlayerDataClass()
    player.info.id = client.userData.id
    player.info.name = client.userData.name
    player.info.sessionId = client.sessionId
    player.ready = true
    player.status = "online"
    player.isFirstGame = result.statistics.win + result.statistics.lose === 0
    player.referrerId =
      !result.from || isNaN(Number(result.from.split("-")[1]))
        ? undefined
        : Number(result.from.split("-")[1])
    player.lastActivity = Date.now()

    room.state.players.set(String(client.userData.id), player)
  } else {
    player.ready = !player.ready
    player.lastActivity = Date.now()

    room.state.players.set(String(client.userData.id), player)
  }

  updateMetadata(room)

  if (
    Array.from(room.state.players.values()).filter((p) => p.ready).length ===
      room.state.visitors.size &&
    room.state.visitors.size >= room.state.minPlayers
  )
    return void startGame(room)

  if (
    Array.from(room.state.players.values()).filter((p) => p.ready).length /
      room.state.visitors.size >=
      0.5 &&
    !room.state.timer
  )
    setTimer(room, 0, "readyTimeout")

  if (!Array.from(room.state.players.values()).filter((p) => p.ready).length)
    clearTimer(room)
}

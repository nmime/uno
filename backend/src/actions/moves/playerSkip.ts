import { MoveContext } from "@actions/onMessage"
import { broadcast, sendError } from "@helpers/send"
import timer from "@actions/timer"

export function playerSkip({
  client,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  if (room.state.currentPlayer !== player.info.id)
    return sendError(client, "notYourMove")

  if (player.playerState !== "tookCards") return sendError(client, "notAllowed")

  const newCurrentPlayer = room.state.getNextPlayer().info.id

  player.playerState = null
  room.state.currentPlayer = newCurrentPlayer

  room.clock.setTimeout(timer, room.state.maxRoundDuration, [
    room,
    room.state.currentPlayer,
    "playerPlaying"
  ])

  broadcast(room, "playerSkip", {
    playerFrom: playerID,
    playerTo: String(newCurrentPlayer)
  })
}

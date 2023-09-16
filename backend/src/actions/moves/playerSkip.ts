import { MoveContext } from "@actions/onMessage"
import { broadcast, sendError } from "@helpers/send"

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

  broadcast(room, "playerSkip", {
    playerFrom: playerID,
    playerTo: String(newCurrentPlayer)
  })

  player.playerState = null
  room.state.currentPlayer = newCurrentPlayer
}

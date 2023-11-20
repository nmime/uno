import { MoveContext } from "@actions/onMessage"
import { broadcast, sendError } from "@helpers/send"
import { setTimer } from "@helpers/setTimer"

export function playerSkip({
  client,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  if (room.state.currentPlayer !== player.info.id)
    return sendError(client, "notYourMove")

  if (player.playerState !== "tookCards")
    return sendError(client, "notTakenCardYet")

  const previousPlayer = room.state.players.get(
    String(room.state.previousPlayer)
  )
  if (previousPlayer) previousPlayer.shoutedUno = false
  room.state.previousPlayer = player.info.id

  const newCurrentPlayer = room.state.getNextPlayer().info.id

  player.playerState = null
  room.state.currentPlayer = newCurrentPlayer

  setTimer(room, room.state.currentPlayer, "playerPlaying")

  broadcast(room, "playerSkip", {
    playerFrom: playerID,
    playerTo: String(newCurrentPlayer)
  })
}

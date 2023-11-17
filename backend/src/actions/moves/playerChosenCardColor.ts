import { MoveContext } from "@actions/onMessage"
import { broadcast, sendError } from "@helpers/send"
import { setTimer } from "@helpers/setTimer"

export function playerChosenCardColor({
  client,
  message,
  player,
  room
}: MoveContext): void {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  if (
    room.state.currentPlayer !== player.info.id ||
    player.playerState !== "chooseColor"
  )
    return sendError(client, "notYourMove")

  room.state.chosenColor = message.color
  player.playerState = null

  const previousPlayer = room.state.players.get(
    String(room.state.previousPlayer)
  )
  if (previousPlayer) previousPlayer.shoutedUno = false
  room.state.previousPlayer = player.info.id

  if (room.state.currentCardParams.cardType === "take-4")
    room.state.currentPlayer = room.state.getPostNextPlayer().info.id
  else room.state.currentPlayer = room.state.getNextPlayer().info.id

  setTimer(room, room.state.currentPlayer, "playerPlaying")

  broadcast(room, "playerPutCard", {
    card: room.state.currentCardParams,
    playerFrom: String(player.info.id),
    playerTo: String(room.state.currentPlayer)
  })
}

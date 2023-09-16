import { MoveContext } from "@actions/onMessage"
import { sendError } from "@helpers/send"

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

  if (room.state.currentCardParams.cardType === "take-4")
    room.state.currentPlayer = room.state.getPostNextPlayer().info.id
  else room.state.currentPlayer = room.state.getNextPlayer().info.id
}

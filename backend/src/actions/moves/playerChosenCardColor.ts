import { MessageInput } from "common"
import { MoveContext } from "@actions/onMessage"

export function playerChosenCardColor({
  client,
  message,
  player,
  room
}: MoveContext): void {
  if (room.state.status !== "playing")
    return client.send("game", {
      type: "notStarted"
    } as MessageInput)

  if (
    room.state.currentPlayer !== player.info.id ||
    player.playerState !== "chooseColor"
  )
    return client.send("game", {
      type: "notYourMove"
    } as MessageInput)

  room.state.chosenColor = message.color
  player.playerState = null

  if (room.state.currentCardParams.cardType === "take-4")
    room.state.currentPlayer = room.state.getPostNextPlayer().info.id
  else room.state.currentPlayer = room.state.getNextPlayer().info.id
}

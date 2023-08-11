import { MessageInput } from "common"
import { MoveContext } from "@actions/onMessage"

export function playerChosenCardColor({
  client,
  message,
  player,
  room
}: MoveContext): void {
  if (
    room.state.currentPlayer !== player.info.id ||
    player.playerState !== "chooseColor"
  )
    return client.send("game", {
      type: "notYourMove"
    } as MessageInput)

  room.state.chosenColor = message.color
}

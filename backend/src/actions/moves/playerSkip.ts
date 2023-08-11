import { MessageInput } from "common"
import { MoveContext } from "@actions/onMessage"

export function playerSkip({
  client,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.currentPlayer !== player.info.id)
    return client.send("game", {
      type: "notYourMove"
    } as MessageInput)

  if (player.playerState !== "tookCards")
    return client.send("game", {
      type: "notAllowed"
    } as MessageInput)
  const newCurrentPlayer = room.state.getNextPlayer().info.id

  room.broadcast("game", {
    playerFrom: playerID,
    playerTo: String(newCurrentPlayer),
    type: "playerSkip"
  } as MessageInput)

  room.state.currentPlayer = newCurrentPlayer
}

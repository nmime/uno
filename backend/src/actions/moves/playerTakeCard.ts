import { MessageInput } from "common"
import { MoveContext } from "@actions/onMessage"
import { sortCards } from "@utils/sortCards"

export function playerTakeCard({
  client,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.status !== "playing")
    return client.send("game", {
      type: "notStarted"
    } as MessageInput)

  if (room.state.currentPlayer !== player.info.id)
    return client.send("game", {
      type: "notYourMove"
    } as MessageInput)

  if (player.playerState === "tookCards")
    return client.send("game", {
      type: "alreadyTook"
    } as MessageInput)

  const card = room.state.getAvailableCards(1).at(0)
  player.cards.push(card)
  player.cards = sortCards(player.cards)
  player.cardsCount = player.cards.length

  player.playerState = "tookCards"

  room.broadcast("game", {
    playerFrom: playerID,
    playerTo: playerID,
    type: "playerTookCard"
  } as MessageInput)
}

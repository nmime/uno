import { MoveContext } from "@actions/onMessage"
import { sortCards } from "@utils/sortCards"
import { broadcast, sendError } from "@helpers/send"
import timer from "@actions/timer"

export function playerTakeCard({
  client,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  if (room.state.currentPlayer !== player.info.id)
    return sendError(client, "notYourMove")

  if (player.playerState === "tookCards")
    return sendError(client, "alreadyTook")

  const card = room.state.getAvailableCards(1).at(0)
  player.cards.push(card)
  player.cards = sortCards(player.cards)
  player.cardsCount = player.cards.length

  player.playerState = "tookCards"

  room.clock.setTimeout(timer, room.state.maxRoundDuration, [
    room,
    player.info.id,
    "playerTookCard"
  ])

  broadcast(room, "playerTookCard", { playerFrom: playerID })
}

import { MoveContext } from "@actions/onMessage"
import { broadcast, sendError } from "@helpers/send"
import { setTimer } from "@helpers/setTimer"
import { sortCards } from "@utils/sortCards"

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

  const previousPlayer = room.state.players.get(
    String(room.state.previousPlayer)
  )
  if (previousPlayer) previousPlayer.shoutedUno = false
  room.state.previousPlayer = player.info.id

  const card = room.state.getAvailableCards(1).at(0)
  player.cards.push(card)
  player.cards = sortCards(player.cards)
  player.cardsCount = player.cards.length

  player.playerState = "tookCards"

  setTimer(room, player.info.id, "playerTookCard")

  broadcast(room, "playerTookCard", { playerFrom: playerID })
}

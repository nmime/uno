import { MoveContext } from "@actions/onMessage"
import { broadcast, sendError } from "@helpers/send"
import { sortCards } from "@utils/sortCards"

export function shoutUno({ client, message, player, room }: MoveContext): void {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  if (
    (room.state.previousPlayer === player.info.id ||
      room.state.currentPlayer === player.info.id) &&
    !message.playerTo
  ) {
    if (
      (player.cards.length !== 1 &&
        room.state.previousPlayer === player.info.id) ||
      (player.cards.length !== 2 &&
        room.state.currentPlayer === player.info.id) ||
      player.shoutedUno
    )
      return sendError(client, "notUnoToShout")

    player.shoutedUno = true

    broadcast(room, "shoutUno", {
      playerFrom: String(player.info.id),
      playerTo: String(player.info.id)
    })
  } else {
    const playerTo = room.state.players.get(message.playerTo)

    if (
      message.playerTo !== String(room.state.previousPlayer) ||
      room.state.previousPlayer === undefined ||
      playerTo.shoutedUno ||
      playerTo.cards.length !== 1
    )
      return sendError(client, "notUnoToNotice")

    playerTo.shoutedUno = true

    const cards = room.state.getAvailableCards(2)
    cards.forEach((card) => playerTo.cards.push(card))
    playerTo.cards = sortCards(playerTo.cards)
    playerTo.cardsCount = playerTo.cards.length
  }
}

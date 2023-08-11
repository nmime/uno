import { cardCanBeUsed, MessageInput } from "common"
import { MoveContext } from "@actions/onMessage"

export function playerPutCard({
  client,
  message,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.currentPlayer !== player.info.id || !message.card)
    return client.send("game", {
      type: "notYourMove"
    } as MessageInput)

  const cardIndex = player.cards.findIndex(
    (e) =>
      e.cardType === message.card.cardType &&
      e.cardColor === message.card.cardColor
  )
  if (
    cardIndex === -1 ||
    !cardCanBeUsed(
      room.state.currentCardParams,
      room.state.chosenColor,
      message.card,
      player.cards
    )
  )
    return client.send("game", {
      type: "cardCantBeUsed"
    } as MessageInput)

  const card = player.cards.splice(cardIndex, 1)[0]
  room.state.usedCards.push(card)
  room.state.currentCardParams = card
  room.state.chosenColor = null

  let newCurrentPlayer = room.state.getNextPlayer().info.id

  switch (message.card.cardType) {
    case "block":
      {
        const blockedPlayer = room.state.getNextPlayer()

        room.broadcast("game", {
          playerFrom: playerID,
          playerTo: String(blockedPlayer.info.id),
          type: "playerBlocked"
        } as MessageInput)

        newCurrentPlayer = room.state.getPostNextPlayer().info.id
      }
      break
    case "reverse":
      {
        room.broadcast("game", {
          playerFrom: playerID,
          playerTo: String(newCurrentPlayer),
          type: "directionSwitched"
        } as MessageInput)

        room.state.isDirectionClockwise = !room.state.isDirectionClockwise
      }
      break
    case "take-2":
      {
        const blockedPlayer = room.state.getNextPlayer()

        room.broadcast("game", {
          playerFrom: playerID,
          playerTo: String(blockedPlayer.info.id),
          type: "playerTake2Card"
        } as MessageInput)

        newCurrentPlayer = room.state.getPostNextPlayer().info.id
      }
      break
    case "take-4":
      {
        const playerThatTakeCards = room.state.getNextPlayer()

        room.broadcast("game", {
          playerFrom: playerID,
          playerTo: String(playerThatTakeCards.info.id),
          type: "playerTake4Card"
        } as MessageInput)

        const cards = room.state.getAvailableCards(4)
        playerThatTakeCards.cards.concat(cards)

        player.playerState = "chooseColor"

        newCurrentPlayer = room.state.currentPlayer
      }
      break
    case "change-color":
      {
        room.broadcast("game", {
          playerFrom: playerID,
          playerTo: String(newCurrentPlayer),
          type: "playerChooseCardColor"
        } as MessageInput)

        player.playerState = "chooseColor"
      }
      break
    default: {
      room.broadcast("game", {
        playerFrom: playerID,
        playerTo: String(newCurrentPlayer),
        type: "playerPutCard"
      } as MessageInput)
    }
  }

  room.state.currentPlayer = newCurrentPlayer
}

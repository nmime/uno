import { MoveContext } from "@actions/onMessage"
import { endGame } from "@helpers/endGame"
import { broadcast, sendError } from "@helpers/send"
import { setTimer } from "@helpers/setTimer"
import { sortCards } from "@utils/sortCards"
import { cardCanBeUsed } from "common/utils"

export function playerPutCard({
  client,
  message,
  player,
  playerID,
  room
}: MoveContext): void {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  if (room.state.currentPlayer !== player.info.id || !message.card)
    return sendError(client, "notYourMove")

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
    return sendError(client, "cardCantBeUsed")

  const card = player.cards.splice(cardIndex, 1)[0]
  room.state.usedCards.push(card)
  room.state.currentCardParams = card
  room.state.chosenColor = null
  player.playerState = null

  let newCurrentPlayer = room.state.getNextPlayer().info.id
  const previousPlayer = room.state.players.get(
    String(room.state.previousPlayer)
  )

  switch (message.card.cardType) {
    case "block":
      {
        const blockedPlayer = room.state.getNextPlayer()

        broadcast(room, "playerBlocked", {
          playerFrom: playerID,
          playerTo: String(blockedPlayer.info.id)
        })

        newCurrentPlayer = room.state.getPostNextPlayer().info.id

        setTimer(room, newCurrentPlayer, "playerPlaying")
      }
      break
    case "reverse":
      {
        room.state.isDirectionClockwise = !room.state.isDirectionClockwise

        if (room.state.players.size === 2)
          newCurrentPlayer = room.state.currentPlayer
        else newCurrentPlayer = room.state.getNextPlayer().info.id

        setTimer(room, newCurrentPlayer, "playerPlaying")
      }
      break
    case "take-2":
      {
        const playerThatTakeCards = room.state.getNextPlayer()

        const cards = room.state.getAvailableCards(2)
        cards.forEach((card) => playerThatTakeCards.cards.push(card))
        playerThatTakeCards.cards = sortCards(playerThatTakeCards.cards)
        playerThatTakeCards.cardsCount = playerThatTakeCards.cards.length

        newCurrentPlayer = room.state.getPostNextPlayer().info.id

        setTimer(room, newCurrentPlayer, "playerPlaying")
      }
      break
    case "take-4":
      {
        const playerThatTakeCards = room.state.getNextPlayer()

        const cards = room.state.getAvailableCards(4)
        cards.forEach((card) => playerThatTakeCards.cards.push(card))
        playerThatTakeCards.cards = sortCards(playerThatTakeCards.cards)
        playerThatTakeCards.cardsCount = playerThatTakeCards.cards.length

        player.playerState = "chooseColor"

        newCurrentPlayer = room.state.currentPlayer

        setTimer(room, newCurrentPlayer, "playerChooseCardColor")
      }
      break
    case "change-color":
      {
        player.playerState = "chooseColor"

        newCurrentPlayer = room.state.currentPlayer

        setTimer(room, newCurrentPlayer, "playerChooseCardColor")
      }
      break
    default: {
      setTimer(room, newCurrentPlayer, "playerPlaying")
    }
  }

  if (
    message.card.cardType !== "change-color" &&
    message.card.cardType !== "take-4"
  ) {
    if (previousPlayer) previousPlayer.shoutedUno = false
    room.state.previousPlayer = player.info.id
  }

  broadcast(room, "playerPutCard", {
    card: message.card,
    playerFrom: playerID,
    playerTo: String(newCurrentPlayer)
  })

  player.cardsCount = player.cards.length

  if (player.cards.length <= 0) return void endGame(room)

  room.state.currentPlayer = newCurrentPlayer
}

import { Client } from "colyseus"
import {
  cardCanBeUsed,
  isGameEvent,
  MessageInit,
  MessageInput,
  Player
} from "common"
import { MyRoom } from "@typings/room"
import { startGame } from "@helpers/startGame"

export default function onMessage(
  room: MyRoom,
  client: Client<Player>,
  message: MessageInit
) {
  if (!isGameEvent(message.type)) return

  const playerID = String(client.userData.id)
  const player = room.state.players.get(playerID)

  switch (message.type) {
    case "PlayerToggledReady":
      player.ready = !player.ready

      room.broadcast("game", {
        player: playerID,
        type: "PlayerToggledReady"
      } as MessageInput)

      if (
        Array.from(room.state.players.values()).filter((p) => p.ready)
          .length === room.state.players.size &&
        room.state.players.size > 1
      )
        startGame(room)
      break
    case "PlayerPutCard":
      {
        if (room.state.currentPlayer !== player.info.id || !message.card) return

        const cardIndex = player.cards.findIndex(
          (e) =>
            e.cardType === message.card.cardType &&
            e.cardColor === message.card.cardColor
        )
        if (cardIndex === -1) return

        if (
          !cardCanBeUsed(
            room.state.currentCardParams,
            message.card,
            player.cards
          )
        )
          return

        const card = player.cards.splice(cardIndex, 1)[0]
        room.state.usedCards.push(card)
        room.state.currentCardParams = card

        switch (message.card.cardType) {
          case "block":
            {
              const blockedPlayer = room.state.getNextPlayer()

              room.broadcast("game", {
                playerFrom: playerID,
                playerTo: String(blockedPlayer.info.id),
                type: "PlayerBlocked"
              } as MessageInput)

              const newCurrentPlayer = room.state.getPostNextPlayer()
              room.state.currentPlayer = newCurrentPlayer.info.id
            }
            break
          case "reverse":
            {
              room.broadcast("game", {
                playerFrom: playerID,
                type: "DirectionSwitched"
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
                type: "PlayerTake2Card"
              } as MessageInput)

              const newCurrentPlayer = room.state.getPostNextPlayer()
              room.state.currentPlayer = newCurrentPlayer.info.id
            }
            break
          case "take-4":
            {
              const playerThatTakeCards = room.state.getNextPlayer()

              room.broadcast("game", {
                playerFrom: playerID,
                playerTo: String(playerThatTakeCards.info.id),
                type: "PlayerTake4Card"
              } as MessageInput)

              const cards = room.state.availableCards.splice(0, 4)
              playerThatTakeCards.cards.concat(cards)

              player.playerState = "ChooseColor"
            }
            break
          case "change-color":
            {
              room.broadcast("game", {
                playerFrom: playerID,
                type: "PlayerChoseCardColor"
              } as MessageInput)

              player.playerState = "ChooseColor"
            }
            break
          default: {
            room.broadcast("game", {
              playerFrom: playerID,
              type: "PlayerPutCard"
            } as MessageInput)
          }
        }
      }
      break
    case "PlayerTakeCard": {
      if (room.state.currentPlayer !== player.info.id) return

      const card = room.state.availableCards.splice(0, 1)[0]

      player.cards.push(card)

      room.broadcast("game", {
        type: "PlayerTookCard"
      } as MessageInput)
      break
    }
  }
}

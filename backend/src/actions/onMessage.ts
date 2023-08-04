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
    case "playerToggledReady":
      player.ready = !player.ready

      room.broadcast("game", {
        player: playerID,
        type: "playerToggledReady"
      } as MessageInput)

      if (
        Array.from(room.state.players.values()).filter((p) => p.ready)
          .length === room.state.players.size &&
        room.state.players.size > 1
      )
        startGame(room)
      break
    case "playerPutCard":
      {
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

              const cards = room.state.availableCards.splice(0, 4)
              playerThatTakeCards.cards.concat(cards)

              player.playerState = "chooseColor"

              newCurrentPlayer = room.state.getPostNextPlayer().info.id
            }
            break
          case "change-color":
            {
              room.broadcast("game", {
                playerFrom: playerID,
                type: "playerChooseCardColor"
              } as MessageInput)

              player.playerState = "chooseColor"
            }
            break
          default: {
            room.broadcast("game", {
              playerFrom: playerID,
              type: "playerPutCard"
            } as MessageInput)
          }
        }

        room.state.currentPlayer = newCurrentPlayer
      }
      break
    case "playerTakeCard": {
      if (room.state.currentPlayer !== player.info.id)
        return client.send("game", {
          type: "notYourMove"
        } as MessageInput)

      if (player.playerState === "takeCards")
        return client.send("game", {
          type: "alreadyTook"
        } as MessageInput)

      const card = room.state.availableCards.splice(0, 1)[0]

      player.cards.push(card)
      player.playerState = "takeCards"

      room.broadcast("game", {
        type: "playerTookCard"
      } as MessageInput)
      break
    }
  }
}

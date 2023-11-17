import { playerPutCard, playerTakeCard, surrender } from "@actions/moves"
import { clearTimer } from "@helpers/clearTimer"
import { getRandomTrueIndex } from "@helpers/getRandomTrueIndex"
import { setTimer } from "@helpers/setTimer"
import { startGame } from "@helpers/startGame"
import { MyRoom } from "@typings/room"
import { cardColorsDefault, GameEvents, PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common/utils"
import { randomInt } from "crypto"

export default function timer(room: MyRoom, actor: number, state: GameEvents) {
  clearTimer(room)

  const playerID = String(actor)
  const player = room.state.players.get(playerID)

  if (room.state.status !== "playing" && state === "readyTimeout") {
    const participants = new Map<string, PlayerDataClass>()

    room.state.visitors.forEach((value, key) => {
      if (!participants.has(key)) {
        const player = new PlayerDataClass()
        player.info = value

        participants.set(key, player)
      }
    })

    room.state.players.forEach((value, key) => {
      participants.set(key, value)
    })

    participants.forEach((element) => {
      if (!element.ready) {
        const client = room.clients.getById(element.info.sessionId)

        if (client) {
          room.state.players.delete(String(element.info.id))
          room.state.visitors.delete(String(element.info.id))

          client.leave(4003)
        }
      }
    })

    if (room.state.visitors.size === 0) return room.disconnect(4004)
    else {
      if (
        Array.from(room.state.players.values()).filter((p) => p.ready)
          .length === room.state.visitors.size &&
        room.state.visitors.size >= room.state.minPlayers
      )
        return startGame(room)
    }
  }

  if (
    room.state.status !== "playing" ||
    !player ||
    room.state.currentPlayer !== player.info.id ||
    (state === "playerChooseCardColor" &&
      player.playerState !== "chooseColor") ||
    (state === "playerTookCard" && player.playerState !== "tookCards")
  )
    return

  if (player.status === "afk")
    return surrender({
      client: null,
      message: {
        type: "playerSurrender"
      },
      player,
      playerID,
      room
    })
  player.status = "afk"

  switch (state) {
    case "playerChooseCardColor":
      room.state.chosenColor = cardColorsDefault[randomInt(4)]
      player.playerState = null

      if (room.state.currentCardParams.cardType === "take-4")
        room.state.currentPlayer = room.state.getPostNextPlayer().info.id
      else room.state.currentPlayer = room.state.getNextPlayer().info.id

      setTimer(room, room.state.currentPlayer, "playerPlaying")

      break
    default: {
      const cards = cardsCanBeUsed(
        room.state.currentCardParams,
        room.state.chosenColor,
        player.cards
      )
      const randomIndex = getRandomTrueIndex(cards)

      if (randomIndex === null)
        return playerTakeCard({
          client: null,
          message: {
            type: "playerTakeCard"
          },
          player,
          playerID,
          room
        })

      return playerPutCard({
        client: null,
        message: {
          card: player.cards[randomIndex],
          type: "playerPutCard"
        },
        player,
        playerID,
        room
      })
    }
  }
}

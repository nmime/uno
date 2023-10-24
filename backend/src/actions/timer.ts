import { playerPutCard, playerTakeCard, surrender } from "@actions/moves"
import { getRandomTrueIndex } from "@helpers/getRandomTrueIndex"
import { setTimer } from "@helpers/setTimer"
import { MyRoom } from "@typings/room"
import { cardColorsDefault, GameEvents } from "common"
import { cardsCanBeUsed } from "common/utils"
import { randomInt } from "crypto"

export default function timer(room: MyRoom, actor: number, state: GameEvents) {
  const playerID = String(actor)
  const player = room.state.players.get(playerID)

  if (
    room.state.status !== "playing" ||
    !player ||
    room.state.currentPlayer !== player.info.id ||
    (state === "playerChooseCardColor" &&
      player.playerState !== "chooseColor") ||
    (state === "playerTookCard" && player.playerState !== "tookCards")
  )
    return

  return

  console.log(
    `TIMER`,
    player.info.name,
    player.info.id,
    room.state.currentPlayer,
    state,
    player.playerState
  )

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

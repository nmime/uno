import { updateMetadata } from "@helpers/updateMetadata"
import { updateUser } from "@helpers/updateUser"
import { amounts } from "@typings/gameAccruals"
import { MyRoom } from "@typings/room"
import { countPoints } from "@utils/countPoints"
import { Game } from "common/database"
import { roundNumber } from "common/utils/roundNumber"

export async function endGame(room: MyRoom): Promise<void> {
  room.state.players.forEach((player) => {
    player.points = countPoints(player.cards)
  })

  const playersArray = Array.from(room.state.players.values()).sort(
    (a, b) => b.points - a.points
  )

  playersArray.forEach((player, index) => {
    player.winAmount =
      Math.round(room.state.bet * amounts[room.state.players.size][index]) / 100
    player.playerState = undefined
  })

  room.state.status = "ended"
  await room.unlock()
  updateMetadata(room)
  room.state.currentPlayer = null

  const tax = playersArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.winAmount
  }, 0)

  await Promise.all([
    ...playersArray.map((player) =>
      updateUser(player.info.id, {
        $inc: {
          [`statistics.${player.winAmount > 0 ? "win" : "lose"}`]: 1,
          balance: roundNumber(room.state.bet + player.winAmount)
        }
      })
    ),
    Game.create({
      bet: room.state.bet,
      createdAt: new Date(),
      id: room.roomId,
      players: playersArray.map((player) => ({
        id: player.info.id,
        points: player.points,
        winAmount: player.winAmount
      })),
      status: "ended",
      tax
    })
  ])
}

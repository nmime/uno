import { updateMetadata } from "@helpers/updateMetadata"
import { updateUser } from "@helpers/updateUser"
import { MyRoom } from "@typings/room"
import { countPoints } from "@utils/countPoints"
import { Game } from "common/database/game"

interface Amounts {
  [key: number]: number[]
}

const amounts: Amounts = {
  2: [95, -100],
  3: [95, -47, -53],
  4: [60, 35, -50, -50],
  5: [60, 35, -30, -33, -37],
  6: [50, 28, 18, -28, -35, -38],
  7: [50, 28, 18, -22, -24, -26, -29],
  8: [45, 24, 18, 12, -23, -25, -27, -29],
  9: [45, 24, 18, 13, -17, -19, -21, -23, -25],
  10: [45, 21, 15, 10, 8, -16, -19, -21, -23, -25]
}

export async function endGame(room: MyRoom): Promise<void> {
  room.state.players.forEach((player) => {
    player.points = countPoints(player.cards)
  })

  const playersArray = Array.from(room.state.players.values()).sort(
    (a, b) => b.points - a.points
  )

  playersArray.forEach((player, index) => {
    player.winAmount = Math.round(
      (room.state.bet * amounts[room.state.players.size][index]) / 100
    )
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
          balance: player.winAmount
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

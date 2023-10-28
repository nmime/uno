import { MoveContext } from "@actions/onMessage"
import { sendError } from "@helpers/send"
import { updateMetadata } from "@helpers/updateMetadata"
import { updateUser } from "@helpers/updateUser"
import { amounts } from "@typings/gameAccruals"
import { countPoints } from "@utils/countPoints"
import { PlayerDataClass } from "common"
import { Game } from "common/database"

function moveToTheEnd(arr: PlayerDataClass[], index: number) {
  if (index < 0 || index >= arr.length) return arr

  const element = arr.splice(index, 1)
  arr.push(element[0])

  return arr
}

export async function surrender({
  client,
  player,
  room
}: MoveContext): Promise<void> {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  room.state.players.forEach((player) => {
    player.points = countPoints(player.cards)
  })

  let playersArray = Array.from(room.state.players.values()).sort(
    (a, b) => b.points - a.points
  )
  playersArray = moveToTheEnd(
    playersArray,
    playersArray.findIndex((element) => element.info.id === player.info.id)
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
          balance:
            player.winAmount > 0
              ? room.state.bet + player.winAmount
              : -(room.state.bet + player.winAmount)
        }
      })
    ),
    Game.create({
      bet: room.state.bet,
      createdAt: new Date(),
      id: room.roomId,
      players: playersArray.map((element) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        JSON.parse(
          JSON.stringify({
            id: element.info.id,
            points: element.points,
            surrender: element.info.id === player.info.id ? true : undefined,
            winAmount: element.winAmount
          })
        )
      ),
      status: "surrender",
      tax
    })
  ])
}

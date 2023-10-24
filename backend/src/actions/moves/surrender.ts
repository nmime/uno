import { MoveContext } from "@actions/onMessage"
import { sendError } from "@helpers/send"
import { updateMetadata } from "@helpers/updateMetadata"
import { updateUser } from "@helpers/updateUser"
import { Game } from "common/database"

export async function surrender({
  client,
  player,
  room
}: MoveContext): Promise<void> {
  if (room.state.status !== "playing") return sendError(client, "notStarted")

  room.state.players.forEach((element) => {
    element.points = element.info.id === player.info.id ? 0 : 1
  })

  const playersArray = Array.from(room.state.players.values())
  playersArray.forEach((element) => {
    element.winAmount =
      element.info.id === player.info.id ? -room.state.bet : room.state.bet
    element.playerState = undefined
  })

  room.state.status = "ended"
  await room.unlock()
  updateMetadata(room)
  room.state.currentPlayer = null

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
        points: player.points
      })),
      status: "surrender",
      tax: 0,
      winAmount: 0
    })
  ])
}

import { MessageInput } from "common"
import { startGame } from "@helpers/startGame"
import { MoveContext } from "@actions/onMessage"

export function playerToggledReady({
  client,
  player,
  room
}: MoveContext): void {
  if (room.state.status === "playing")
    return client.send("game", {
      type: "alreadyStarted"
    } as MessageInput)

  player.ready = !player.ready

  if (
    Array.from(room.state.players.values()).filter((p) => p.ready).length ===
      room.state.players.size &&
    room.state.players.size > 1
  )
    return startGame(room)
}

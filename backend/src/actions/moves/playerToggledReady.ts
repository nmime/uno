import { MessageInput, PlayerDataClass } from "common"
import { startGame } from "@helpers/startGame"
import { MoveContext } from "@actions/onMessage"
import { updateMetadata } from "@helpers/updateMetadata"

export function playerToggledReady({
  client,
  player,
  room
}: MoveContext): void {
  if (room.state.status === "playing")
    return client.send("game", {
      type: "alreadyStarted"
    } as MessageInput)

  if (!player) {
    const player = new PlayerDataClass()
    player.info.id = client.userData.id
    player.info.name = client.userData.name
    player.info.language = client.userData.language
    player.ready = true
    player.status = "online"

    room.state.players.set(String(client.userData.id), player)
  } else {
    player.ready = !player.ready
    room.state.players.set(String(client.userData.id), player)
  }

  updateMetadata(room)

  if (
    Array.from(room.state.players.values()).filter((p) => p.ready).length ===
      room.state.visitors.size &&
    room.state.players.size > 1
  )
    return void startGame(room)
}

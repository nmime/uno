import { GameMetadata, maxPlayers, MessageInput, PlayerDataClass } from "common"
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

  const playersKeys = Array.from(room.state.players.keys())
  const visitorsKeys = Array.from(room.state.visitors.keys())

  const firstPlayer =
    room.state.players.get(playersKeys[0])?.info ||
    room.state.visitors.get(visitorsKeys[0])

  void room.setMetadata({
    bet: room.state.bet,
    creatorId: firstPlayer.id,
    creatorName: firstPlayer.name,
    maxPlayers: maxPlayers,
    playersCount: Array.from(room.state.visitors.values()).length
  } as GameMetadata)

  if (
    Array.from(room.state.players.values()).filter((p) => p.ready).length ===
      room.state.visitors.size &&
    room.state.players.size > 1
  )
    return startGame(room)
}

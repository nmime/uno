import { startGame } from "@helpers/startGame"
import { MyRoom } from "@typings/room"
import { PlayerDataClass } from "common"

export async function kickInactive(room: MyRoom) {
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
    if (
      !element.ready &&
      Date.now() - element.lastActivity > room.state.maxRoundDuration
    ) {
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
      Array.from(room.state.players.values()).filter((p) => p.ready).length ===
        room.state.visitors.size &&
      room.state.visitors.size >= room.state.minPlayers
    )
      return startGame(room)
  }
}

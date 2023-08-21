import { GameMetadata, maxPlayers } from "common"
import { MyRoom } from "@typings/room"

export function updateMetadata(room: MyRoom) {
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
    playersCount:
      room.state.status === "playing"
        ? room.state.players.size
        : room.state.visitors.size
  } as GameMetadata)
}

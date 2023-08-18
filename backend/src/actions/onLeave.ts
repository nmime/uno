import { Client } from "colyseus"
import { GameMetadata, Player } from "common"
import { MyRoom } from "@typings/room"

export default function onLeave(this: MyRoom, client: Client<Player>) {
  this.state.visitors.delete(String(client.userData.id))

  const player = this.state.players.get(String(client.userData.id))
  if (player) {
    if (this.state.status !== "playing")
      this.state.players.delete(String(client.userData.id))
    else {
      player.status = "offline"
      this.state.players.set(String(client.userData.id), player)
    }
  }

  const playersKeys = Array.from(this.state.players.keys())
  const visitorsKeys = Array.from(this.state.visitors.keys())

  const firstPlayer =
    this.state.players.get(playersKeys[0])?.info ||
    this.state.visitors.get(visitorsKeys[0])

  void this.setMetadata({
    bet: this.state.bet,
    creatorId: firstPlayer.id,
    creatorName: firstPlayer.name,
    maxPlayers: 10,
    playersCount: Array.from(this.state.visitors.values()).length
  } as GameMetadata)
}

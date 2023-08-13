import { Client } from "colyseus"
import { GameMetadata, Player } from "common"
import { MyRoom } from "@typings/room"

export default function onLeave(this: MyRoom, client: Client<Player>) {
  const player = this.state.players.get(String(client.userData.id))
  if (!player) return

  if (this.state.status !== "playing")
    this.state.players.delete(String(client.userData.id))
  else {
    player.status = "offline"
    this.state.players.set(String(client.userData.id), player)
  }

  const playersCount = Array.from(this.state.players.values()).length
  const firstPlayer = this.state.players.get(
    Array.from(this.state.players.keys())[0]
  )

  void this.setMetadata({
    bet: this.state.bet,
    creatorId: firstPlayer.info.id,
    creatorName: firstPlayer.info.name,
    maxPlayers: 10,
    playersCount
  } as GameMetadata)
}

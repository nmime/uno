import { Client } from "colyseus"
import { GameMetadata, maxPlayers, Player, PlayerDataClass } from "common"
import { MyRoom } from "@typings/room"

export default function onJoin(this: MyRoom, client: Client<Player>) {
  const player = this.state.players.get(String(client.userData.id))
  const playersCount = Array.from(this.state.players.values()).length

  if (this.state.status === "playing" && playersCount >= maxPlayers) return

  if (!player) {
    const player = new PlayerDataClass()
    player.info.id = client.userData.id
    player.info.name = client.userData.name
    player.info.language = client.userData.language
    player.ready = false
    player.status = "online"

    this.state.players.set(String(client.userData.id), player)
  } else {
    player.status = "online"
    this.state.players.set(String(client.userData.id), player)
  }

  const firstPlayer = this.state.players.get(
    Array.from(this.state.players.keys())[0]
  )

  void this.setMetadata({
    bet: this.state.bet,
    creatorId: firstPlayer.info.id,
    creatorName: firstPlayer.info.name,
    maxPlayers: 10,
    playersCount: Array.from(this.state.players.values()).length
  } as GameMetadata)
}

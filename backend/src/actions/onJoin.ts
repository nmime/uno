import { Client } from "colyseus"
import { GameMetadata, maxPlayers, Player, PlayerDataClass } from "common"
import { MyRoom } from "@typings/room"

export default function onJoin(
  this: MyRoom,
  client: Client<Player>,
  options: any,
  auth: Player
) {
  const player = this.state.players.get(String(client.userData.id))
  const playerCount = Array.from(this.state.players.values()).filter(
    (p) => p.gameStatus === "spectator"
  ).length

  if (!player) {
    const player = new PlayerDataClass()
    player.info.id = auth.id
    player.info.name = auth.name
    player.info.language = auth.language
    player.ready = false
    player.status = "online"
    player.gameStatus =
      this.state.status !== "playing" && playerCount < maxPlayers
        ? "player"
        : "spectator"

    this.state.players.set(String(auth.id), player)
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
    playerCount: this.state.players.size
  } as GameMetadata)
}

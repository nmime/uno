import { Client } from "colyseus"
import { GameMetadata, maxPlayers, Player, PlayerClass } from "common"
import { MyRoom } from "@typings/room"

export default function onJoin(this: MyRoom, client: Client<Player>) {
  const visitor = new PlayerClass()
  visitor.id = client.userData.id
  visitor.name = client.userData.name
  visitor.language = client.userData.language

  this.state.visitors.set(String(client.userData.id), visitor)

  const playersKeys = Array.from(this.state.players.keys())
  const visitorsKeys = Array.from(this.state.visitors.keys())

  const firstPlayer =
    this.state.players.get(playersKeys[0])?.info ||
    this.state.visitors.get(visitorsKeys[0])

  void this.setMetadata({
    bet: this.state.bet,
    creatorId: firstPlayer.id,
    creatorName: firstPlayer.name,
    maxPlayers: maxPlayers,
    playersCount: Array.from(this.state.visitors.values()).length
  } as GameMetadata)
}

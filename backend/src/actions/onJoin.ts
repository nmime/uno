import { updateMetadata } from "@helpers/updateMetadata"
import { MyRoom } from "@typings/room"
import { Client } from "colyseus"
import { Player, PlayerClass } from "common"

export default function onJoin(this: MyRoom, client: Client<Player>) {
  const visitor = new PlayerClass()
  visitor.id = client.userData.id
  visitor.name = client.userData.name
  visitor.sessionId = client.sessionId

  this.state.visitors.set(String(client.userData.id), visitor)

  const player = this.state.players.get(String(client.userData.id))
  if (player) {
    player.status = "online"
    this.state.players.set(String(client.userData.id), player)
  }

  updateMetadata(this)
}

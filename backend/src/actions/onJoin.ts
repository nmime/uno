import { Client } from "colyseus"
import { Player, PlayerClass } from "common"
import { MyRoom } from "@typings/room"
import { updateMetadata } from "@helpers/updateMetadata"

export default function onJoin(this: MyRoom, client: Client<Player>) {
  const visitor = new PlayerClass()
  visitor.id = client.userData.id
  visitor.name = client.userData.name
  visitor.language = client.userData.language

  this.state.visitors.set(String(client.userData.id), visitor)

  updateMetadata(this)
}

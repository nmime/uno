import { Client } from "colyseus"
import { Player } from "common"
import { MyRoom } from "@typings/room"
import { updateMetadata } from "@helpers/updateMetadata"

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

  updateMetadata(this)
}

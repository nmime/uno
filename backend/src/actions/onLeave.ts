import { Client } from "colyseus"
import { Player } from "common"
import { MyRoom } from "@typings/room"

export default async function onLeave(this: MyRoom, client: Client<Player>) {
  const player = this.state.players.get(String(client.userData.id))
  if (!player) return

  if (this.state.status !== "playing")
    this.state.players.delete(String(client.userData.id))
  else {
    player.status = "offline"
    this.state.players.set(String(client.userData.id), player)
  }

  await this.allowReconnection(client, 100000)
}

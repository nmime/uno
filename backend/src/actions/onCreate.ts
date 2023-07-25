import { MessageInit, MyState, Player } from "common"
import { MyRoom } from "@typings/room"
import onMessage from "./onMessage"
import { Client } from "colyseus"

export default function onCreate(this: MyRoom, options: any) {
  const state = new MyState()
  state.createdAt = Date.now()
  state.status = "waiting"
  state.bet = 100

  this.setState(state)

  this.onMessage("game", (client: Client<Player>, options: MessageInit) =>
    onMessage(this, client, options)
  )
}

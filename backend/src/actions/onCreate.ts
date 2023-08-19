import {
  ConnectOptions,
  GameMetadata,
  maxPlayers,
  MessageInit,
  MyState,
  Player,
  PlayerClass,
  PlayerDataClass
} from "common"
import { MyRoom } from "@typings/room"
import onMessage from "./onMessage"
import { Client } from "colyseus"
import { MapSchema } from "@colyseus/schema"

export default function onCreate(this: MyRoom, options: ConnectOptions) {
  if (options.id) this.roomId = options.id
  this.autoDispose = false

  const state = new MyState()
  state.createdAt = Date.now()
  state.status = "waiting"
  state.bet = 100
  state.players = new MapSchema<PlayerDataClass, string>()
  state.visitors = new MapSchema<PlayerClass, string>()
  state.isDirectionClockwise = true
  state.chosenColor = null

  this.setState(state)
  this.setSeatReservationTime(60)
  this.onMessage("game", (client: Client<Player>, options: MessageInit) =>
    onMessage(this, client, options)
  )

  void this.setMetadata({
    bet: state.bet,
    creatorId: options.player.id,
    creatorName: options.player.name,
    maxPlayers: maxPlayers,
    playersCount: 1
  } as GameMetadata)
}

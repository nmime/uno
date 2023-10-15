import { MyRoom } from "@typings/room"
import { Client, matchMaker } from "colyseus"
import {
  ConnectOptions,
  maxPlayers,
  MessageInit,
  Metadata,
  minPlayers,
  MyState,
  Player
} from "common"

import onMessage from "./onMessage"

export default async function onCreate(this: MyRoom, options: ConnectOptions) {
  if (options.id) {
    const room = matchMaker.getRoomById(options.id)
    if (!room) this.roomId = options.id
  }
  if (options.privateGame) await this.setPrivate(options.privateGame)

  this.autoDispose = false

  const state = new MyState()
  state.createdAt = Date.now()
  state.status = "waiting"
  state.bet = options.bet > 10 ? options.bet : 10
  state.isDirectionClockwise = true
  state.chosenColor = null
  state.maxRoundDuration = 30000
  if (options.minPlayers) state.minPlayers = options.minPlayers
  else state.minPlayers = minPlayers

  this.setState(state)
  this.setSeatReservationTime(60)
  this.onMessage("game", (client: Client<Player>, options: MessageInit) => {
    void onMessage(this, client, options)
  })

  void this.setMetadata({
    bet: state.bet,
    creatorId: options.player.id,
    creatorName: options.player.name,
    maxPlayers: maxPlayers,
    minPlayers: minPlayers,
    playersCount: 1
  } as Metadata)

  this.clock.start()
}

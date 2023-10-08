import {
  ConnectOptions,
  maxPlayers,
  MessageInit,
  Metadata,
  MyState,
  Player
} from "common"
import { MyRoom } from "@typings/room"
import onMessage from "./onMessage"
import { Client, matchMaker } from "colyseus"

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
  state.bet = options.bet > 100 ? options.bet : 100
  state.isDirectionClockwise = true
  state.chosenColor = null
  state.maxRoundDuration = 30000

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
    playersCount: 1
  } as Metadata)

  this.clock.start()
}

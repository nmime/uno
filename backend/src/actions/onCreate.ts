import { matchMaker } from "@colyseus/core"
import { updateMetadata } from "@helpers/updateMetadata"
import { validation } from "@helpers/validation"
import { MyRoom } from "@typings/room"
import { Client, ServerError } from "colyseus"
import {
  ConnectOptions,
  maxPlayers,
  MessageInit,
  minBet,
  minPlayers,
  MyState,
  Player
} from "common"
import ShortUniqueId from "short-unique-id"

import onMessage from "./onMessage"

export default async function onCreate(this: MyRoom, options: ConnectOptions) {
  if (!validation(options.initDataRaw)) throw new ServerError(401)

  if (options.id) {
    const room = await matchMaker.driver.has(options.id)
    if (!room) this.roomId = options.id
  } else {
    const uid = new ShortUniqueId({ length: 9 })

    this.roomId = uid.rnd()
  }
  if (options.privateGame) await this.setPrivate(options.privateGame)

  const state = new MyState()
  state.createdAt = Date.now()
  state.status = "waiting"
  state.bet = !isNaN(options.bet) && options.bet > minBet ? options.bet : minBet
  state.isDirectionClockwise = true
  state.chosenColor = null
  state.maxRoundDuration = 30000

  state.minPlayers =
    !isNaN(options.minPlayers) &&
    options.minPlayers > minPlayers &&
    options.minPlayers < maxPlayers &&
    options.minPlayers <= options.maxPlayers
      ? options.maxPlayers
      : minPlayers

  state.maxPlayers =
    !isNaN(options.maxPlayers) &&
    options.maxPlayers < maxPlayers &&
    options.maxPlayers >= minPlayers
      ? options.maxPlayers
      : maxPlayers

  this.setState(state)
  this.setSeatReservationTime(60)
  this.onMessage("game", (client: Client<Player>, options: MessageInit) => {
    void onMessage(this, client, options)
  })

  updateMetadata(this)

  this.clock.start()
}

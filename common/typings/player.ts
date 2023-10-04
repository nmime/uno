import { ArraySchema, filter, Schema, type } from "@colyseus/schema"
import { CardDataClass } from "./сard"
import { Client } from "colyseus"
import { MyState } from "./game"
import { isArrayEqual } from "../utils"

export type PlayerState = null | "chooseColor" | "tookCards"

export type PlayerStatus = "online" | "offline" | "afk"

export class PlayerClass extends Schema {
  @type("number") id: number
  @type("string") name: string
  @type("string") language: string
}

export type Player = InstanceType<typeof PlayerClass>

export interface ConnectOptions {
  player: {
    id: number
    name: string
    language: string
  }
  id: string
  privateGame: boolean
  bet: number
  initDataRaw: string
}

export class PlayerDataClass extends Schema {
  @type(PlayerClass) info = new PlayerClass()

  @type("string") status?: PlayerStatus
  @type("boolean") ready?: boolean

  @type("number") points?: number
  @type("number") winAmount?: number

  @type("string") playerState?: PlayerState

  @filter(function (
    client: Client<Player>,
    value: ArraySchema<CardDataClass>,
    root: MyState
  ) {
    const player = root.players.get(String(client.userData?.id))

    if (!player || typeof player.cards === "undefined") return false

    return isArrayEqual(Array.from(player.cards), Array.from(value))
  })
  @type([CardDataClass])
  cards? = new ArraySchema<CardDataClass>()

  @type("number") cardsCount?: number
}

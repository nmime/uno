import { ArraySchema, filter, Schema, type } from "@colyseus/schema"
import { CardDataClass } from "./Card"
import { Client } from "colyseus"
import { MyState } from "./Game"
import { isArrayEqual } from "../utils/isArrayEqual"

export type PlayerState = null | "ChooseColor" | "TakeCards"

export type PlayerStatus = "online" | "offline" | "afk"
export type CurrentPlayerGameStatus = "player" | "spectator"

export class PlayerClass extends Schema {
  @type("number") id: number
  @type("string") name: string
  @type("string") language: string
}

export type Player = InstanceType<typeof PlayerClass>

export class PlayerDataClass extends Schema {
  @type(PlayerClass) info = new PlayerClass()

  @type("string") status: PlayerStatus
  @type("string") gameStatus: CurrentPlayerGameStatus
  @type("boolean") ready: boolean

  @type("string") playerState: PlayerState

  @filter(function (
    client: Client<Player>,
    value: CardDataClass[],
    root: MyState
  ) {
    const player = root.players.get(String(client.userData?.id))

    if (!player) throw new Error("Player not found")

    return isArrayEqual(player.cards, value)
  })
  @type([CardDataClass])
  cards: CardDataClass[] = new ArraySchema<CardDataClass>()
}

export type PlayerData = InstanceType<typeof PlayerDataClass>

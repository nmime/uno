import { ArraySchema, filter, MapSchema, Schema, type } from "@colyseus/schema"
import { CardDataClass } from "./Card"
import { PlayerDataClass } from "./Player"

export const maxPlayers = 10 as const
export const gameEventsArray = [
  "gameEnded",
  "playerWon",
  "playerJoined",
  "playerLeft",
  "playerBlocked",
  "playerTakeCard",
  "playerTookCard",
  "playerToggledReady",
  "playerPutCard",
  "playerChooseCardColor",
  "directionSwitched",
  "playerTake2Card",
  "playerTake4Card",
  "playerSkip",
  "playerSurrender",
  "unknownAction"
] as const
export type GameEvents = (typeof gameEventsArray)[number]

export const gameErrorsArray = [
  "cardCantBeUsed",
  "notYourMove",
  "alreadyTook"
] as const
export type GameErrors = (typeof gameErrorsArray)[number]

export function isGameEvent(type: string | number): type is GameEvents {
  return (
    typeof type === "string" && gameEventsArray.includes(type as GameEvents)
  )
}

export type GameStatus = "waiting" | "playing" | "ended"

export type GameType = "private" | "public"

export class MyState extends Schema {
  @type("number") bet: number
  @type("number") createdAt: number
  @type("number") maxPlayers: number
  @type("number") maxRoundDuration: number

  @type("boolean") isDirectionClockwise: boolean
  @type("string") type: GameType
  @type("string") status: GameStatus
  @type("number") currentPlayer: number

  @filter(function (): boolean {
    return false
  })
  @type([CardDataClass])
  availableCards = new ArraySchema<CardDataClass>()
  @filter(function (): boolean {
    return false
  })
  @type([CardDataClass])
  usedCards = new ArraySchema<CardDataClass>()

  @type(CardDataClass) currentCardParams: CardDataClass

  @type({ map: PlayerDataClass })
  players = new MapSchema<PlayerDataClass>()

  getNextPlayer(): PlayerDataClass {
    const playersArray = Array.from(this.players.values())

    const currentPlayerIndex = playersArray.findIndex(
      (player) => player.info.id === this.currentPlayer
    )

    let nextPlayerIndex =
      (currentPlayerIndex + (this.isDirectionClockwise ? 1 : -1)) %
      playersArray.length

    if (nextPlayerIndex < 0) nextPlayerIndex += playersArray.length

    const player = this.players.get(
      String(playersArray[nextPlayerIndex].info.id)
    )
    if (!player) throw new Error("Player not found")

    return player
  }

  getPostNextPlayer(): PlayerDataClass {
    const playersArray = Array.from(this.players.values())

    const currentPlayerIndex = playersArray.findIndex(
      (player) => player.info.id === this.currentPlayer
    )

    let postNextPlayerIndex =
      (currentPlayerIndex + (this.isDirectionClockwise ? 2 : -2)) %
      playersArray.length

    if (postNextPlayerIndex < 0) postNextPlayerIndex += playersArray.length

    const player = this.players.get(
      String(playersArray[postNextPlayerIndex].info.id)
    )
    if (!player) throw new Error("Player not found")

    return player
  }
}

export type Game = InstanceType<typeof MyState>

export type GameMetadata = {
  playersCount: number
  maxPlayers: number
  creatorName: string
  creatorId: number
  bet: number
}

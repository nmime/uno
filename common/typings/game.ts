import { ArraySchema, filter, MapSchema, Schema, type } from "@colyseus/schema"
import { CardColorsDefault, CardDataClass } from "./сard"
import { PlayerClass, PlayerDataClass } from "./player"
import { shuffle } from "../utils"

export const maxPlayers = 10 as const
export const gameEventsArray = [
  "gameEnded",
  "playerWon",
  "playerJoined",
  "playerLeft",
  "playerPlaying",
  "playerBlocked",
  "playerTakeCard",
  "playerTookCard",
  "playerToggledReady",
  "playerPutCard",
  "playerChooseCardColor",
  "playerChosenCardColor",
  "directionSwitched",
  "playerTake2Card",
  "playerTake4Card",
  "playerSkip",
  "playerSurrender"
] as const
export type GameEvents = (typeof gameEventsArray)[number]

export const gameErrorsArray = [
  "alreadyStarted",
  "cardCantBeUsed",
  "notYourMove",
  "notTakenCardYet",
  "alreadyTook",
  "notStarted",
  "notEnoughBalance",
  "unknownAction",
  "notTakenCardYet"
] as const
export type GameErrors = (typeof gameErrorsArray)[number]

export function isGameEvent(type: string | number): type is GameEvents {
  return (
    typeof type === "string" && gameEventsArray.includes(type as GameEvents)
  )
}

export type GameStatus = "waiting" | "playing" | "ended"

export class MyState extends Schema {
  @type("number") bet: number
  @type("number") createdAt: number
  @type("number") maxPlayers: number

  @type("boolean") isDirectionClockwise: boolean
  @type("string") status: GameStatus
  @type("number") currentPlayer: number

  @type("number") maxRoundDuration: number
  @type("number") timer: number

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
  @type("string" || null) chosenColor: CardColorsDefault | null

  @type({ map: PlayerDataClass })
  players: MapSchema<PlayerDataClass, string> = new MapSchema<PlayerDataClass>()

  @type({ map: PlayerClass })
  visitors = new MapSchema<PlayerClass>()

  getNextPlayer(): PlayerDataClass {
    const playersArray = Array.from(this.players.values())
    const currentPlayerIndex = playersArray.findIndex(
      (player) => player.info.id === this.currentPlayer
    )

    const nextPlayerIndex =
      (currentPlayerIndex +
        (this.isDirectionClockwise ? 1 : -1) +
        playersArray.length) %
      playersArray.length

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

    const postNextPlayerIndex =
      (currentPlayerIndex +
        (this.isDirectionClockwise ? 2 : -2) +
        playersArray.length) %
      playersArray.length

    const player = this.players.get(
      String(playersArray[postNextPlayerIndex].info.id)
    )
    if (!player) throw new Error("Player not found")

    return player
  }

  getAvailableCards(quantity: number): ArraySchema<CardDataClass> {
    if (quantity > this.availableCards.length) {
      const usedCards = shuffle(Array.from(this.usedCards))

      usedCards.forEach((card) => this.availableCards.push(card))
      this.usedCards.clear()
    }

    const cardsToRetrieve = this.availableCards.splice(0, quantity)

    const retrievedCards = new ArraySchema<CardDataClass>()
    cardsToRetrieve.forEach((card) => {
      this.usedCards.push(card)
      retrievedCards.push(card)
    })

    return retrievedCards
  }
}

export type Game = InstanceType<typeof MyState>

export interface Metadata {
  bet: number
  creatorId: number
  creatorName: string
  maxPlayers: number
  playersCount: number
  status: GameStatus
}

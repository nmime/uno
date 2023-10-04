import {
  CardColorsDefault,
  CardDataClass,
  GameStatus,
  PlayerClass,
  PlayerDataClass
} from "common"

export interface Game {
  bet: number
  createdAt: number
  maxPlayers: number

  isDirectionClockwise: boolean
  status: GameStatus
  currentPlayer: number

  maxRoundDuration: number
  timer: number

  currentCardParams: CardDataClass
  chosenColor: CardColorsDefault | null

  players: Map<string, PlayerDataClass>
  visitors: Map<string, PlayerClass>
}

import { GameErrors, GameEvents } from "./Game"
import { CardColors, CardData } from "./Card"

export type MessageInit = {
  type: GameEvents
  card?: CardData
  color?: CardColors
}

export type MessageInput = {
  type: GameEvents | GameErrors
  card?: CardData
  playerFrom?: string
  playerTo?: string
}

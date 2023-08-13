import { GameErrors, GameEvents } from "./Game"
import { CardColorsDefault, CardData } from "./Card"

export type MessageInit = {
  type: GameEvents
  card?: CardData
  color?: CardColorsDefault
}

export type MessageInput = {
  type: GameEvents | GameErrors
  card?: CardData
  playerFrom?: string
  playerTo?: string
}

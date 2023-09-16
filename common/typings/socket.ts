import { GameErrors, GameEvents } from "./game"
import { CardColorsDefault, CardData } from "./сard"

export interface MessageInit {
  type: GameEvents
  card?: CardData
  color?: CardColorsDefault
}

export interface MessageInput {
  type: GameEvents | GameErrors
  card?: CardData
  playerFrom?: string
  playerTo?: string
  ok?: boolean
}

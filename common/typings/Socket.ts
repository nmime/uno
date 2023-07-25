import { GameEvents } from "./Game"
import { CardData } from "./Card"

export type MessageInit = {
  type: GameEvents
  card?: CardData
}

export type MessageInput = {
  type: GameEvents
  card?: CardData
  playerFrom?: string
  playerTo?: string
}

import { CardColors, CardDataClass } from "common"
import { cardCanBeUsed } from "./cardCanBeUsed"

export function cardsCanBeUsed(
  currentCardParams: CardDataClass,
  chosenColor: CardColors | null,
  playerCards: CardDataClass[]
) {
  return playerCards.map((card) =>
    cardCanBeUsed(currentCardParams, chosenColor, card, playerCards)
  )
}

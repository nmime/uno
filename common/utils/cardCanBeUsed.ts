import { CardDataClass } from "common"

export function cardCanBeUsed(
  currentCardParams: CardDataClass,
  card: CardDataClass,
  playerCards: CardDataClass[]
) {
  if (
    card.type === currentCardParams.type ||
    card.color === currentCardParams.color ||
    card.color === "black"
  ) {
    if (
      card.type === "take-4" &&
      playerCards.findIndex(
        (e) =>
          e.color === currentCardParams.color ||
          e.type === currentCardParams.type
      ) === -1
    )
      return true
  }

  return false
}

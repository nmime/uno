import { CardDataClass } from "common"

export function cardsCanBeUsed(
  currentCardParams: CardDataClass,
  playerCards: CardDataClass[]
) {
  return playerCards.map((card) => {
    if (
      card.cardType === currentCardParams.cardType ||
      card.cardColor === currentCardParams.cardColor ||
      card.cardColor === "black"
    ) {
      if (card.cardType === "take-4")
        return (
          playerCards.findIndex(
            (e) =>
              e.cardColor === currentCardParams.cardColor ||
              e.cardType === currentCardParams.cardType
          ) === -1
        )

      return true
    }

    return false
  })
}

import { CardColors, CardDataClass } from "common"

export function cardsCanBeUsed(
  currentCardParams: CardDataClass,
  chosenColor: CardColors | null,
  playerCards: CardDataClass[]
) {
  return playerCards.map((card) => {
    if (chosenColor) return card.cardColor === chosenColor

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

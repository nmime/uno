import { CardDataClass } from "common"

export function countPoints(cards: CardDataClass[]): number {
  return cards.reduce(
    (accumulator, currentValue) =>
      accumulator -
      (currentValue.cardColor === "black"
        ? 50
        : currentValue.cardType === "block" ||
          currentValue.cardType === "take-2" ||
          currentValue.cardType === "reverse"
        ? 40
        : Number(currentValue.cardType)),
    0
  )
}

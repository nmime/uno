import { cardColors, CardDataClass } from "common"

export function sortCards(cards: CardDataClass[]) {
  return cards.sort(
    (a, b) => cardColors.indexOf(a.color) - cardColors.indexOf(b.color)
  )
}

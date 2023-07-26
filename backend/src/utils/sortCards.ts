import { cardColorArray, CardDataClass } from "common"

export function sortCards(cards: CardDataClass[]) {
  return cards.sort(
    (a, b) =>
      cardColorArray.indexOf(a.cardColor) - cardColorArray.indexOf(b.cardColor)
  )
}

import { cardColorArray, CardDataClass } from "common"
import { ArraySchema } from "@colyseus/schema"

export function sortCards(cards: ArraySchema<CardDataClass>) {
  return cards.sort(
    (a, b) =>
      cardColorArray.indexOf(a.cardColor) - cardColorArray.indexOf(b.cardColor)
  )
}

import { ArraySchema } from "@colyseus/schema"
import { cardColorArray, CardDataClass } from "common"

export function sortCards(cards: ArraySchema<CardDataClass>) {
  return cards.sort(
    (a, b) =>
      cardColorArray.indexOf(a.cardColor) - cardColorArray.indexOf(b.cardColor)
  )
}

import { Schema, type } from "@colyseus/schema"

export const cardColorsDefault = ["yellow", "blue", "green", "red"] as const
export const cardColorBlack = "black" as const
export const cardColors = [...cardColorsDefault, cardColorBlack] as const
export type CardColors = (typeof cardColors)[number]

export const cardType0 = "0" as const
export const cardTypeDefault = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
] as const
export const cardTypeSpecial = ["block", "reverse", "take-2"] as const
export const cardTypeBlack = ["change-color", "take-4"] as const
export const cardTypeArray = [
  cardType0,
  ...cardTypeDefault,
  ...cardTypeSpecial,
  ...cardTypeBlack
] as const
export type CardTtypes = (typeof cardTypeArray)[number]

export class CardDataClass extends Schema {
  @type("string") color: CardColors
  @type("string") type: CardTtypes

  constructor(cardColor: CardColors, cardType: CardTtypes) {
    super()

    this.color = cardColor
    this.type = cardType
  }
}

export type CardData = InstanceType<typeof CardDataClass>

import { Schema, type } from "@colyseus/schema"

export const cardColorsDefault = ["red", "yellow", "green", "blue"] as const
export type CardColorsDefault = (typeof cardColorsDefault)[number]
export const cardColorBlack = "black" as const
export const cardColorArray = [...cardColorsDefault, cardColorBlack] as const
export type CardColors = (typeof cardColorArray)[number]

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
export type CardTypes = (typeof cardTypeArray)[number]

export class CardDataClass extends Schema {
  @type("string") cardColor: CardColors
  @type("string") cardType: CardTypes

  constructor(cardColor: CardColors, cardType: CardTypes) {
    super()

    this.cardColor = cardColor
    this.cardType = cardType
  }
}

export type CardData = InstanceType<typeof CardDataClass>

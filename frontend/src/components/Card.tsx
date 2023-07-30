import React from "react"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"

export interface CardProps {
  card: CardDataClass
}

const fullWidth = 3362
const fullHeight = 2882
const width = 240
const height = 360
const scale = 0.7

export const finalCardWidth = width * scale

export default function Card({ card: { cardType, cardColor } }: CardProps) {
  const typeIndex = cardTypeArray.indexOf(cardType)
  const colorIndex = cardColorArray.indexOf(cardColor)

  const xPos = -typeIndex * width + (cardType === "take-4" ? width : 0)
  const yPos =
    cardType === "change-color"
      ? 0
      : cardType === "take-4"
      ? 1440
      : -colorIndex * height

  return (
    <div
      style={{
        backgroundImage:
          "url(https://upload.wikimedia.org/wikipedia/commons/9/95/UNO_cards_deck.svg)",
        backgroundPosition: `${xPos * scale}px ${yPos * scale}px`,
        backgroundSize: `${fullWidth * scale}px ${fullHeight * scale}px`,
        width: `${width * scale}px`,
        height: `${height * scale}px`
      }}
    />
  )
}

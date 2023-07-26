import React from "react"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"

export interface CardProps {
  card: CardDataClass
}

export default function Card({ card: { cardType, cardColor } }: CardProps) {
  const width = 240
  const height = 360

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
        backgroundPosition: `${xPos}px ${yPos}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: "scale(0.5)",
        boxShadow: "0 0 30px transparentize(black, 0.8)"
      }}
    />
  )
}

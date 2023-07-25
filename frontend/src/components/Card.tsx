import React from "react"
import { CardColors, cardColorArray, cardTypeArray, CardTypes } from "common"

export interface CardProps {
  cardType: CardTypes
  cardColor: CardColors
}

export default function Card({ cardType, cardColor }: CardProps) {
  const width = 240
  const height = 360

  const typeIndex = cardTypeArray.indexOf(cardType)
  const colorIndex = cardColorArray.indexOf(cardColor)

  const xPos = -typeIndex * width
  const yPos = -colorIndex * height

  return (
    <div
      style={{
        backgroundImage: `url(/cards_deck.svg)`,
        backgroundPosition: `${xPos}px ${yPos}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  )
}

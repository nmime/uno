import React from "react"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"

export interface CardProps {
  card: CardDataClass
}

const fullWidth = 3450
const fullHeight = 1380
const width = 230
const height = 345
const scale = 0.65

export const finalCardWidth = width * scale

export default function Card({ card: { cardType, cardColor } }: CardProps) {
  const typeIndex = cardTypeArray.indexOf(cardType)
  const colorIndex = cardColorArray.indexOf(cardColor)

  const xPos = -typeIndex * width
  const yPos = -colorIndex * height

  return (
    <div
      style={{
        backgroundImage: "url(https://unogame.site/images/cards_deck.svg)",
        backgroundPosition: `${xPos * scale}px ${yPos * scale}px`,
        backgroundSize: `${fullWidth * scale}px ${fullHeight * scale}px`,
        width: `${width * scale}px`,
        height: `${height * scale}px`
      }}
    />
  )
}

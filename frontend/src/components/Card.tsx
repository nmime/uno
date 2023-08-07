import React from "react"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"

export interface CardProps {
  card: CardDataClass
  scale?: number
}

const fullWidth = 3450
const fullHeight = 1380
export const cardWidth = 230
const cardHeight = 345

export default function Card({
  card: { cardType, cardColor },
  scale = 0.6
}: CardProps) {
  const typeIndex = cardTypeArray.indexOf(cardType)
  const colorIndex = cardColorArray.indexOf(cardColor)

  const xPos = -typeIndex * cardWidth
  const yPos = -colorIndex * cardHeight
  
  return (
    <div
      style={{
        backgroundImage: "url(https://unogame.site/images/cards_deck.svg)",
        backgroundPosition: `${xPos * scale}px ${yPos * scale}px`,
        backgroundSize: `${fullWidth * scale}px ${fullHeight * scale}px`,
        width: `${cardWidth * scale + 2}px`,
        height: `${cardHeight * scale + 2}px`,
        border: "solid black 1.5px",
        borderRadius: "24px"
      }}
    />
  )
}

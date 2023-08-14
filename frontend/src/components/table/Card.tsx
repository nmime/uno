import React from "react"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"
import { MainCardProps } from "@table/MainCard"

export interface CardProps {
  card: CardDataClass
  scale?: number
  chosenColor?: MainCardProps["chosenColor"]
}

const fullWidth = 3910
const fullHeight = 1380
export const cardWidth = 230
const cardHeight = 345

export default function Card({
  card: { cardType, cardColor },
  scale = 0.6,
  chosenColor
}: CardProps) {
  const typeIndex = cardTypeArray.indexOf(cardType) + (chosenColor ? 2 : 0)
  const colorIndex = cardColorArray.indexOf(chosenColor ?? cardColor)

  const xPos = -typeIndex * cardWidth
  const yPos = -colorIndex * cardHeight

  return (
    <div
      style={{
        backgroundImage: "url(https://unogame.site/images/cards_deck.svg)",
        backgroundPosition: `${xPos * scale}px ${yPos * scale}px`,
        backgroundSize: `${fullWidth * scale}px ${fullHeight * scale}px`,
        width: `${cardWidth * scale}px`,
        height: `${cardHeight * scale}px`,
        border: "solid black 1.5px",
        borderRadius: "24px",
        backgroundOrigin: "border-box"
      }}
    />
  )
}

import React, { useContext } from "react"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"
import { MainCardProps } from "@table/MainCard"
import { DimensionContext } from "@contexts/Dimension"

export interface CardProps {
  card: CardDataClass
  type: "inFan" | "main"
  chosenColor?: MainCardProps["chosenColor"]
}

const fullWidth = 3910
const fullHeight = 1380
export const cardWidth = 230
export const cardHeight = 345

export default function Card({
  card: { cardType, cardColor },
  type,
  chosenColor
}: CardProps) {
  const { cardScale } = useContext(DimensionContext)

  const scale = cardScale + (type === "main" ? 0.1 : 0)

  const typeIndex = cardTypeArray.indexOf(cardType) + (chosenColor ? 2 : 0)
  const colorIndex = cardColorArray.indexOf(chosenColor ?? cardColor)

  const xPos = -typeIndex * cardWidth
  const yPos = -colorIndex * cardHeight

  return (
    <div
      style={{
        backgroundImage: "url(/images/cards_deck.svg)",
        backgroundPosition: `${xPos * scale}px ${yPos * scale}px`,
        backgroundSize: `${fullWidth * scale}px ${fullHeight * scale}px`,
        width: `${cardWidth * scale}px`,
        height: `${cardHeight * scale}px`,
        backgroundOrigin: "border-box"
      }}
    />
  )
}

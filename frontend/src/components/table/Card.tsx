import { DimensionContext } from "@contexts/Dimension"
import { MainCardProps } from "@table/MainCard"
import { cardColorArray, CardDataClass, cardTypeArray } from "common"
import React, { useContext } from "react"

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
  card: { cardColor, cardType },
  chosenColor,
  type
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
        backgroundImage: "url(/assets/cards_deck.svg)",
        backgroundOrigin: "border-box",
        backgroundPosition: `${xPos * scale}px ${yPos * scale}px`,
        backgroundSize: `${fullWidth * scale}px ${fullHeight * scale}px`,
        height: `${cardHeight * scale}px`,
        width: `${cardWidth * scale}px`
      }}
    />
  )
}

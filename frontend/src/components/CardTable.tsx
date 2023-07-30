import React from "react"
import MainCard, { MainCardProps } from "@components/MainCard"
import CardFan, { CardFanProps } from "@components/CardFan"
import { DndContext } from "@dnd-kit/core"

export interface CardProps {
  currentCard: MainCardProps["card"]
  cards: CardFanProps["cards"]
}

export default function CardTable({ currentCard, cards }: CardProps) {
  return (
    <DndContext>
      <MainCard card={currentCard} />
      <CardFan cards={cards} />
    </DndContext>
  )
}

import React from "react"
import MainCard, { MainCardProps } from "@components/MainCard"
import CardFan from "@components/CardFan"
import { DndContext } from "@dnd-kit/core"
import type { PlayerDataClass } from "common"

export interface CardProps {
  currentCard: MainCardProps["card"]
  currentPlayer: PlayerDataClass
  isCurrentMove: boolean
}

export default function CardTable({
  currentCard,
  currentPlayer,
  isCurrentMove
}: CardProps) {
  return (
    <DndContext>
      <MainCard card={currentCard} isCurrentMove={isCurrentMove} />
      <CardFan cards={currentPlayer.cards} />
    </DndContext>
  )
}

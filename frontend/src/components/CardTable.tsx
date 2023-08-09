import React from "react"
import MainCard, { MainCardProps } from "@components/MainCard"
import CardFan from "@components/CardFan"
import { DndContext } from "@dnd-kit/core"
import type { PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common"

export interface CardProps {
  currentCard: MainCardProps["card"]
  currentPlayer: PlayerDataClass
  isCurrentMove: boolean
  isDirectionClockwise: boolean
}

export default function CardTable({
  currentCard,
  currentPlayer,
  isCurrentMove,
  isDirectionClockwise
}: CardProps) {
  const playerCardsCanBeUsed = cardsCanBeUsed(
    currentCard,
    currentPlayer.cards
  ).includes(true)

  return (
    <DndContext>
      <MainCard
        card={currentCard}
        isCurrentMove={isCurrentMove}
        playerCardsCanBeUsed={playerCardsCanBeUsed}
        isDirectionClockwise={isDirectionClockwise}
      />
      <CardFan cards={currentPlayer.cards} />
    </DndContext>
  )
}

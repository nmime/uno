import React from "react"
import MainCard, { MainCardProps } from "@components/MainCard"
import CardFan from "@components/CardFan"
import { DndContext } from "@dnd-kit/core"
import type { PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common"
import ChooseColor from "@components/ChooseColor"

export interface CardProps {
  currentCard: MainCardProps["card"]
  thisPlayer: PlayerDataClass
  isCurrentMove: boolean
  isDirectionClockwise: boolean
}

export default function CardTable({
  currentCard,
  thisPlayer,
  isCurrentMove,
  isDirectionClockwise
}: CardProps) {
  const playerCardsCanBeUsed = cardsCanBeUsed(
    currentCard,
    thisPlayer.cards
  ).includes(true)

  return (
    <DndContext>
      <MainCard
        card={currentCard}
        isCurrentMove={isCurrentMove}
        playerCardsCanBeUsed={playerCardsCanBeUsed}
        isDirectionClockwise={isDirectionClockwise}
      />
      {thisPlayer.playerState === "chooseColor" ? <ChooseColor /> : ""}
      <CardFan cards={thisPlayer.cards} />
    </DndContext>
  )
}

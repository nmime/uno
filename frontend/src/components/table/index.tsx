import React from "react"
import { DndContext } from "@dnd-kit/core"
import type { PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common"

import MainCard from "@table/MainCard"
import CardFan from "@table/CardFan"
import ChooseColor from "@table/ChooseColor"
import { Game } from "@contexts/Game"

interface CardProps {
  game: Game
  thisPlayer: PlayerDataClass
}

export default function CardTable({ game, thisPlayer }: CardProps) {
  const playerCardsCanBeUsed = cardsCanBeUsed(
    game.currentCardParams,
    game.chosenColor,
    thisPlayer.cards
  ).includes(true)

  return (
    <DndContext>
      <MainCard
        card={game.currentCardParams}
        isCurrentMove={game.currentPlayer === thisPlayer.info.id}
        playerCardsCanBeUsed={playerCardsCanBeUsed}
        isDirectionClockwise={game.isDirectionClockwise}
        playerState={thisPlayer.playerState}
        chosenColor={game.chosenColor}
      />
      {thisPlayer.playerState === "chooseColor" ? <ChooseColor /> : ""}
      <CardFan cards={thisPlayer.cards} />
    </DndContext>
  )
}

import { DndContext } from "@dnd-kit/core"
import CardFan from "@table/CardFan"
import ChooseColor from "@table/ChooseColor"
import MainCard from "@table/MainCard"
import { Game } from "@typings/game"
import type { PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common/utils"
import React from "react"

interface CardProps {
  game: Game
  thisPlayer: PlayerDataClass
}

export default function CardTable({ game, thisPlayer }: CardProps) {
  const playerCardsCanBeUsed =
    typeof thisPlayer.cards === "undefined"
      ? false
      : cardsCanBeUsed(
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
        playerState={thisPlayer.playerState || null}
        chosenColor={game.chosenColor}
      />
      {thisPlayer.playerState === "chooseColor" ? <ChooseColor /> : ""}
      {thisPlayer.cards && <CardFan cards={thisPlayer.cards} />}
    </DndContext>
  )
}

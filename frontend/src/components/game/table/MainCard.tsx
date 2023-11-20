import { DimensionContext } from "@contexts/Dimension"
import { GameContext } from "@contexts/Game"
import { useDroppable } from "@dnd-kit/core"
import Card from "@table/Card"
import { Game } from "@typings/game"
import type { CardDataClass, PlayerState } from "common"
import { MessageInit } from "common"
import Image from "next/image"
import React, { useContext } from "react"

export type MainCardProps = {
  card: CardDataClass
  isCurrentMove: boolean
  playerCardsCanBeUsed: boolean
  isDirectionClockwise: Game["isDirectionClockwise"]
  playerState: PlayerState
  chosenColor: Game["chosenColor"]
}

export default function MainCard({
  card,
  chosenColor,
  isCurrentMove,
  isDirectionClockwise,
  playerCardsCanBeUsed,
  playerState
}: MainCardProps) {
  const { room } = useContext(GameContext)
  const { cardHeight, cardScale, cardWidth } = useContext(DimensionContext)

  const { setNodeRef } = useDroppable({
    id: "droppable"
  })

  return (
    <div>
      <div
        className={`fixed left-[60%] -translate-x-1/2 -translate-y-1/2 ${
          !playerCardsCanBeUsed && isCurrentMove && !playerState
            ? "animate-pulse"
            : ""
        }`}
        style={{
          top: cardHeight * 1.15
        }}
        onClick={() =>
          room.send("game", {
            type: "playerTakeCard"
          } as MessageInit)
        }
      >
        <Image
          src={`/assets/card_back.svg`}
          width={cardWidth}
          height={cardHeight}
          alt=""
        />
      </div>
      <div
        className={`fixed left-[30%] top-[23%] ${
          playerCardsCanBeUsed && isCurrentMove && playerState !== "chooseColor"
            ? "animate-pulse"
            : ""
        }`}
        style={{
          top: cardHeight * 0.85
        }}
        ref={setNodeRef}
      >
        <Card card={card} type="main" chosenColor={chosenColor} />
      </div>
      <div
        style={{
          top: cardHeight * 2.3,
          transform: `translate(-50%, -50%) scale(${0.8 * cardScale}) rotateY(${
            isDirectionClockwise ? "180" : "0"
          }deg)`
        }}
        className="fixed left-[50%] "
      >
        <Image src={`/assets/arrow.svg`} width={161} height={46} alt="" />
      </div>
    </div>
  )
}

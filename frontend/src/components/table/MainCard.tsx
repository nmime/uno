import { DimensionContext } from "@contexts/Dimension"
import { GameContext } from "@contexts/Game"
import { useDroppable } from "@dnd-kit/core"
import Card, { cardHeight, cardWidth } from "@table/Card"
import { usePopup } from "@tma.js/sdk-react"
import { Game } from "@typings/game"
import type { CardDataClass, PlayerState } from "common"
import { MessageInit } from "common"
import Image from "next/image"
import { useTranslations } from "next-intl"
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
  isCurrentMove,
  playerCardsCanBeUsed,
  isDirectionClockwise,
  playerState,
  chosenColor
}: MainCardProps) {
  const t = useTranslations("MainCardPage")
  const popup = usePopup()

  const { room } = useContext(GameContext)
  const dimension = useContext(DimensionContext)

  const { setNodeRef } = useDroppable({
    id: "droppable"
  })

  return (
    <div>
      <div
        className={`fixed left-[60%] top-[39%] -translate-x-1/2 -translate-y-1/2 ${
          !playerCardsCanBeUsed && isCurrentMove && !playerState
            ? "animate-pulse"
            : ""
        }`}
        onClick={() =>
          room.send("game", {
            type: "playerTakeCard"
          } as MessageInit)
        }
      >
        <Image
          src={`/assets/card_back.svg`}
          width={cardWidth * dimension.cardScale}
          height={cardHeight * dimension.cardScale}
          alt=""
        />
      </div>
      <div
        className={`fixed left-[30%] top-[29%] ${
          playerCardsCanBeUsed && isCurrentMove && playerState !== "chooseColor"
            ? "animate-pulse"
            : ""
        }`}
        ref={setNodeRef}
      >
        <Card card={card} type="main" chosenColor={chosenColor} />
      </div>
      <div
        style={{
          transform: `translate(-50%, -50%) scale(0.6) rotateY(${
            isDirectionClockwise ? "180" : "0"
          }deg)`
        }}
        className="fixed left-[50%] top-[70%]"
      >
        <Image src={`/assets/arrow.svg`} width={161} height={46} alt="" />
      </div>
    </div>
  )
}

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
      <div className="fixed bottom-3 left-3 z-[3] h-12 w-12 rounded-lg bg-[--secondary-background-color] p-2 text-center text-[--button-text-color] opacity-90 shadow-sm transition-all hover:scale-110">
        <button
          type="button"
          className="text-secondary-700 flex h-full w-full items-center justify-center text-center text-sm font-medium shadow-sm"
          onClick={() =>
            popup
              .open({
                message: t("surrenderMessage"),
                buttons: [
                  {
                    id: "yes",
                    type: "destructive",
                    text: t("surrenderYes")
                  },
                  {
                    id: "no",
                    type: "default",
                    text: t("surrenderNo")
                  }
                ]
              })
              .then((event) => {
                if (event === "yes")
                  room.send("game", {
                    type: "playerSurrender"
                  } as MessageInit)
              })
          }
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 13 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

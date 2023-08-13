import Card from "@table/Card"
import type { CardDataClass, PlayerState } from "common"
import { CardColorsDefault, MessageInit } from "common"
import { useDroppable } from "@dnd-kit/core"
import React, { useContext } from "react"
import Image from "next/image"
import { GameContext } from "@contexts/Game"
import { usePopup } from "@twa.js/sdk-react"
import { useTranslations } from "next-intl"

export type MainCardProps = {
  card: CardDataClass
  isCurrentMove: boolean
  playerCardsCanBeUsed: boolean
  isDirectionClockwise: boolean
  playerState: PlayerState
  chosenColor: CardColorsDefault | null
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

  const { setNodeRef } = useDroppable({
    id: "droppable"
  })

  return (
    <div>
      <div
        style={{
          transform: "translate(-50%, -50%) scale(0.75)",
          borderRadius: "30px",
          boxShadow:
            !playerCardsCanBeUsed && isCurrentMove && !playerState
              ? `0px 0px 10px 10px yellow`
              : ""
        }}
        className="fixed left-[60%] top-[40%]"
        onClick={() =>
          room.send("game", {
            type: "playerTakeCard"
          } as MessageInit)
        }
      >
        <Image
          src={`https://unogame.site/images/card_back.svg`}
          width={230}
          height={345}
          alt=""
        />
      </div>
      <div
        ref={setNodeRef}
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow:
            playerCardsCanBeUsed &&
            isCurrentMove &&
            playerState !== "chooseColor"
              ? `0px 0px 10px 12px yellow`
              : "",
          borderRadius: "30px"
        }}
        className="fixed left-[45%] top-[48%]"
      >
        <Card card={card} scale={0.63} />
      </div>
      <div
        style={{
          transform: `translate(-50%, -50%) scale(0.6) rotateY(${
            isDirectionClockwise ? "180" : "0"
          }deg)`
        }}
        className="fixed left-[50%] top-[73%]"
      >
        <Image
          src={`https://unogame.site/images/arrow.svg`}
          width={161}
          height={46}
          alt=""
        />
      </div>
      {isCurrentMove ? (
        <div
          style={{
            boxShadow:
              !playerCardsCanBeUsed && playerState === "tookCards"
                ? "0px 0px 5px 5px yellow"
                : ""
          }}
          className="fixed bottom-3 right-3 z-[3] h-12 w-12 rounded-lg bg-[--secondary-background-color] p-2 text-center text-[--button-text-color] shadow-sm"
        >
          <button
            type="button"
            className="text-secondary-700 flex h-full w-full items-center justify-center text-center text-sm font-medium shadow-sm"
            onClick={() =>
              room.send("game", {
                type: "playerSkip"
              } as MessageInit)
            }
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 fill-current"
              fill="currentColor"
              viewBox="0 0 13 13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"></path>
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="fixed bottom-3 left-3 z-[3] h-12 w-12 rounded-lg bg-[--secondary-background-color] p-2 text-center text-[--button-text-color] shadow-sm">
        <button
          type="button"
          className="text-secondary-700 flex h-full w-full items-center justify-center text-center text-sm font-medium shadow-sm"
          onClick={() =>
            popup
              .open({
                message: t("surrenderMessage"),
                buttons: [
                  {
                    id: "no",
                    type: "default",
                    text: t("surrenderNo")
                  },
                  {
                    id: "yes",
                    type: "destructive",
                    text: t("surrenderYes")
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

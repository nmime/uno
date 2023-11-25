import { DimensionContext } from "@contexts/Dimension"
import { GameContext } from "@contexts/Game"
import { MessageInit, PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common/utils"
import Image from "next/image"
import { useTranslations } from "next-intl"
import React, { useContext, useEffect, useState } from "react"

type BottomLineProps = {
  thisPlayer: PlayerDataClass
}

export default function BottomLine({ thisPlayer }: BottomLineProps) {
  const { cardHeight } = useContext(DimensionContext)
  const { game, room } = useContext(GameContext)

  const t = useTranslations("BottomLine")

  const [percentage, setPercentage] = useState(100)
  useEffect(() => {
    if (
      (game.status === "playing" &&
        thisPlayer.info?.id === game.currentPlayer) ||
      (game.status !== "playing" && game.timer && !thisPlayer.ready)
    ) {
      const intervalId = setInterval(() => {
        const timeElapsed = Date.now() - (game.timer - game.maxRoundDuration)
        let newPercentage = (timeElapsed / game.maxRoundDuration) * 100

        if (newPercentage < 0) newPercentage = 0
        if (newPercentage > 100) newPercentage = 100

        setPercentage(newPercentage)
      }, 100)

      return () => clearInterval(intervalId)
    } else setPercentage(100)
  }, [thisPlayer, game.currentPlayer])

  const isCardToMove = cardsCanBeUsed(
    game.currentCardParams,
    game.chosenColor,
    thisPlayer.cards
  ).includes(true)

  return (
    <div
      className={`fixed bottom-0 flex w-full items-center justify-between rounded-t-2xl bg-[--button-color] ${
        (game.status === "playing" &&
          game.currentPlayer === thisPlayer?.info?.id &&
          !isCardToMove) ||
        (game.status !== "playing" && !thisPlayer.ready)
          ? "animate-pulse cursor-pointer"
          : ""
      }`}
      style={{ height: cardHeight * 0.28 }}
      onClick={() => {
        if (game.status !== "playing")
          return room.send("game", {
            type: "playerToggledReady"
          } as MessageInit)

        if (game.currentPlayer !== thisPlayer.info.id) return

        room.send("game", {
          type:
            thisPlayer.playerState === "tookCards"
              ? "playerSkip"
              : "playerTakeCard"
        } as MessageInit)
      }}
    >
      <div
        className="transition-width absolute left-0 z-[1] h-full rounded-t-2xl bg-[--button-color-dark] duration-300"
        style={{ width: `${100 - percentage}%` }}
      ></div>
      <div className="relative left-1/2 z-[2] -translate-x-1/2 text-lg font-semibold text-[--button-text-color]">
        {t(
          game.status !== "playing"
            ? thisPlayer.ready
              ? "ready"
              : "notReady"
            : game.currentPlayer === thisPlayer.info.id
              ? thisPlayer.playerState === "tookCards"
                ? "pass"
                : "takeCard"
              : "waitingMove"
        )}
      </div>
      {(thisPlayer.info.id === game.currentPlayer ||
        (thisPlayer.info.id === game.previousPlayer &&
          !thisPlayer.shoutedUno &&
          thisPlayer.cardsCount === 1)) && (
        <div
          className={`z-[3] flex cursor-pointer items-center justify-end pr-4 ${
            !thisPlayer.shoutedUno && thisPlayer.cardsCount <= 2
              ? "animate-pulse"
              : ""
          }`}
        >
          <button
            type="button"
            className="flex items-center rounded-full bg-[--hint-color-dark] px-4 text-center text-base font-medium text-[--button-text-color] hover:bg-[--hint-color-light] focus:bg-[--hint-color-dark] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation()

              room.send("game", {
                type: "shoutUno"
              } as MessageInit)
            }}
            style={{
              paddingBottom: `${cardHeight * 0.027}px`,
              paddingTop: `${cardHeight * 0.027}px`
            }}
          >
            <Image
              src={`/assets/blue_fire.svg`}
              alt=""
              width={cardHeight * 0.12}
              height={cardHeight * 0.12}
              className="mr-1 inline-block"
            />
            UNO
          </button>
        </div>
      )}
    </div>
  )
}

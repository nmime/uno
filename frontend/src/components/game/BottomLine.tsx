import { DimensionContext } from "@contexts/Dimension"
import { GameContext } from "@contexts/Game"
import { cardHeight } from "@table/Card"
import { MessageInit, PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common/utils"
import { useTranslations } from "next-intl"
import React, { useContext, useEffect, useState } from "react"

type BottomLineProps = {
  thisPlayer: PlayerDataClass
}

export default function BottomLine({ thisPlayer }: BottomLineProps) {
  const { cardScale } = useContext(DimensionContext)
  const { game, room } = useContext(GameContext)

  const t = useTranslations("BottomLine")

  const [percentage, setPercentage] = useState(100)
  useEffect(() => {
    const intervalId = setInterval(() => {
      let newPercentage =
        thisPlayer.info?.id === game.currentPlayer
          ? ((game.maxRoundDuration - (game.timer - Date.now())) /
              game.maxRoundDuration) *
            100
          : 100
      if (newPercentage < 0) newPercentage = 0
      if (newPercentage > 100) newPercentage = 100

      setPercentage(newPercentage)
    }, 100)

    return () => clearInterval(intervalId)
  }, [thisPlayer, game.currentPlayer])

  const isCardToMove = cardsCanBeUsed(
    game.currentCardParams,
    game.chosenColor,
    thisPlayer.cards
  ).includes(true)

  return (
    <div
      className={`fixed bottom-0 flex w-full items-center justify-center rounded-t-2xl bg-[--button-color] ${
        (game.status === "playing" &&
          game.currentPlayer === thisPlayer?.info?.id &&
          !isCardToMove) ||
        (game.status !== "playing" && !thisPlayer.ready)
          ? "animate-pulse cursor-pointer"
          : ""
      }`}
      style={{ height: cardHeight * cardScale * 0.28 }}
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
      <div className="z-[2] text-lg font-semibold text-[--button-text-color]">
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
    </div>
  )
}

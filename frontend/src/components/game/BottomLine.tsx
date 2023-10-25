import { DimensionContext } from "@contexts/Dimension"
import { GameContext } from "@contexts/Game"
import { cardHeight } from "@table/Card"
import { Game } from "@typings/game"
import { PlayerDataClass } from "common"
import { cardsCanBeUsed } from "common/utils"
import { useTranslations } from "next-intl"
import React, { useContext, useEffect, useState } from "react"

type BottomLineProps = {
  thisPlayer: PlayerDataClass
}

export default function BottomLine({ thisPlayer }: BottomLineProps) {
  const dimension = useContext(DimensionContext)
  const { game, room } = useContext(GameContext)

  const t = useTranslations("Game")

  const [percentage, setPercentage] = useState(100)
  useEffect(() => {
    const intervalId = setInterval(() => {
      let newPercentage =
        thisPlayer.info.id === game.currentPlayer
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
      className={`fixed bottom-0 flex w-full items-center justify-center bg-[--button-color] ${
        game.status === "playing" &&
        game.currentPlayer === thisPlayer?.info?.id &&
        !isCardToMove
          ? "animate-pulse cursor-pointer"
          : ""
      }`}
      style={{ height: cardHeight * dimension.cardScale * 0.27 }}
      onClick={() => {
        if (game.currentPlayer !== thisPlayer.info.id) return

        room.send("game", {
          type:
            thisPlayer.playerState === "tookCards"
              ? "playerSkip"
              : "playerTakeCard"
        })
      }}
    >
      <div
        className="transition-width absolute z-[1] h-full w-full bg-[--button-color-dark] duration-300"
        style={{ right: `${percentage}%` }}
      ></div>
      <div className="z-[2] text-lg font-semibold text-[--button-text-color]">
        {t(
          game.currentPlayer === thisPlayer.info.id
            ? !isCardToMove && thisPlayer.playerState !== "tookCards"
              ? "takeCard"
              : "pass"
            : "waitingMove"
        )}
      </div>
    </div>
  )
}

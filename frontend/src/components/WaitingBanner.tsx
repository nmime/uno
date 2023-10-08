import { TextWithCoin } from "@components/TextWithCoin"
import { GameContext } from "@contexts/Game"
import { MessageInit, PlayerDataClass } from "common"
import { useTranslations } from "next-intl"
import React, { useContext } from "react"

type WaitingBannerProps = {
  player: PlayerDataClass
}

export default function WaitingBanner({ player }: WaitingBannerProps) {
  const { room } = useContext(GameContext)

  const t = useTranslations("GamePage")

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex max-w-lg flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
          <div className="p-5 text-center">
            <h3 className="text-xl font-medium text-[--text-color]">
              {t("startingGame")}
            </h3>
            <p className="pt-2 text-xl text-[--text-color-dark] text-gray-500 ">
              {!player.ready ? t("getReady") : t("waitingPlayers")}
            </p>
          </div>
          <div className="mx-4 mb-4">
            <button
              type="button"
              className={`rounded-full bg-[--button-color] px-5 py-2.5 text-center text-xl font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed ${
                !player.ready ? "animate-pulse" : ""
              }`}
              onClick={() =>
                room.send("game", {
                  type: "playerToggledReady"
                } as MessageInit)
              }
            >
              {!player.ready ? t("ready") : t("notReady")}
            </button>
          </div>
        </div>
      </div>
      {player.winAmount ? (
        <div className="absolute left-1/2 top-[80%] flex -translate-x-1/2 -translate-y-1/2 flex-col text-lg text-[--text-color]">
          <TextWithCoin
            text={`${player.winAmount > 0 ? t("win") : t("lose")} ${Math.abs(
              player.winAmount
            )}`}
            width={16}
            height={16}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

import React, { useContext } from "react"
import { useTranslations } from "next-intl"
import { MessageInit, PlayerDataClass } from "common"
import { GameContext } from "@contexts/Game"

type WaitingBannerProps = {
  player: PlayerDataClass
}

export default function WaitingBanner({ player }: WaitingBannerProps) {
  const { room } = useContext(GameContext)

  const t = useTranslations("GamePage")

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex max-w-lg flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
        <div className="p-5 text-center">
          <h3 className="text-xl font-medium text-[--text-color]">
            {t("waitingPlayers")}
          </h3>
          <p className="pt-2 text-xl text-[--text-color-dark] text-gray-500 ">
            {t("getReady")}
          </p>
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="rounded-full bg-[--button-color] px-5 py-2.5 text-center text-xl font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed"
            onClick={() =>
              room.send("game", {
                type: "playerToggledReady"
              } as MessageInit)
            }
          >
            {player.ready ? t("ready") : t("notReady")}
          </button>
        </div>
      </div>
    </div>
  )
}

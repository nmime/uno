import React, { useContext } from "react"
import { useTranslations } from "next-intl"
import { cardColorsDefault, MessageInit } from "common"
import { GameContext } from "@contexts/Game"

export default function ChooseColor() {
  const { room } = useContext(GameContext)

  const t = useTranslations("ChooseColor")

  const colors = {
    red: "#ff5555",
    yellow: "#ffaa00",
    green: "#55aa55",
    blue: "#5555ff"
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex max-w-lg flex-col items-center gap-2 rounded-lg bg-[--secondary-background-color] p-4 opacity-95 shadow">
        <div className="p-3 text-center">
          <h3 className="text-xl font-medium text-[--text-color]">
            {t("text")}
          </h3>
        </div>
        <div className="mb-2 flex gap-2">
          {cardColorsDefault.map((color, index) => (
            <button
              key={index}
              type="button"
              className="w-16 rounded-full p-6"
              style={{ backgroundColor: colors[color] }}
              onClick={() =>
                room.send("game", {
                  type: "playerChosenCardColor",
                  color
                } as MessageInit)
              }
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}

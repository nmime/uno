import { GameContext } from "@contexts/Game"
import { useMainButton as useMainButtonSdk } from "@tma.js/sdk-react"
import { PlayerDataClass } from "common"
import { useTranslations } from "next-intl"
import { useContext, useEffect } from "react"

const useMainButton = (thisPlayer: PlayerDataClass) => {
  const { game, room } = useContext(GameContext)

  const mainButton = useMainButtonSdk()
  const t = useTranslations("Game")

  useEffect(() => {
    const open = () =>
      room.send("game", {
        type: "playerSkip"
      })

    if (
      game.status === "playing" &&
      game.currentPlayer === thisPlayer?.info?.id
    ) {
      mainButton.setText(t("pass"))
      mainButton.enable()
      mainButton.show()

      mainButton.showProgress()
    } else mainButton.hide()

    mainButton.on("click", open)

    return () => mainButton.off("click", open)
  }, [thisPlayer])

  return mainButton
}

export default useMainButton

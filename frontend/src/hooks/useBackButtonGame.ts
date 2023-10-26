import { GameContext } from "@contexts/Game"
import { useBackButton, useInitData, usePopup } from "@tma.js/sdk-react"
import { MessageInit } from "common"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useContext, useEffect } from "react"

const useBackButtonGame = () => {
  const t = useTranslations("Exit")
  const backButton = useBackButton()
  const popup = usePopup()
  const router = useRouter()
  const { game, room } = useContext(GameContext)
  const initData = useInitData()

  useEffect(() => {
    const back = () =>
      popup
        .open({
          buttons: [
            {
              id: "yes",
              text: t("yes"),
              type: "destructive"
            },
            {
              id: "no",
              text: t("no"),
              type: "default"
            }
          ],
          message: t("message")
        })
        .then(async (event) => {
          if (event === "yes") {
            router.replace("/")
            localStorage.removeItem(
              `${initData.user.id}_lastGameReconnectionToken`
            )

            if (room) {
              if (game.status === "playing")
                room.send("game", {
                  type: "playerSurrender"
                } as MessageInit)

              await room?.leave()
            }
          }
        })

    backButton.show()

    backButton.on("click", back)
    return () => backButton.off("click", back)
  }, [room, game.status])

  return backButton
}

export default useBackButtonGame

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
  const { room, game } = useContext(GameContext)
  const initData = useInitData()

  useEffect(() => {
    const back = () =>
      popup
        .open({
          message: t("message"),
          buttons: [
            {
              id: "yes",
              type: "destructive",
              text: t("yes")
            },
            {
              id: "no",
              type: "default",
              text: t("no")
            }
          ]
        })
        .then(async (event) => {
          if (event === "yes") {
            if (game.status === "playing" && room) {
              room.send("game", {
                type: "playerSurrender"
              } as MessageInit)

              await room.leave()
            }

            localStorage.setItem(
              `${initData.user.id}_currentGame`,
              "disconnect"
            )

            router.replace("/")
          }
        })

    backButton.on("click", back)

    backButton.show()

    return () => backButton.off("click", back)
  }, [backButton, game.status])

  return backButton
}

export default useBackButtonGame

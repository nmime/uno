import { GameContext } from "@contexts/Game"
import { useBackButton, useInitData, usePopup } from "@tma.js/sdk-react"
import { MessageInit } from "common"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useContext, useEffect, useState } from "react"

const useBackButtonGame = () => {
  const t = useTranslations("Exit")
  const backButton = useBackButton()
  const popup = usePopup()
  const router = useRouter()
  const { game, room } = useContext(GameContext)
  const initData = useInitData()

  const [userConfirmedExit, setUserConfirmedExit] = useState(false)

  const leaveRoomAndRedirect = useCallback(async () => {
    if (game.status === "playing" && room) {
      room.send("game", {
        type: "playerSurrender"
      } as MessageInit)

      await room.leave()
    }
  }, [game.status, room])

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
        .then((event) => {
          if (event === "yes") {
            setUserConfirmedExit(true)

            router.replace("/")
            localStorage.removeItem(
              `${initData.user.id}_lastGameReconnectionToken`
            )
          }
        })

    backButton.show()

    backButton.on("click", back)
    return () => backButton.off("click", back)
  }, [backButton, popup])

  useEffect(() => {
    if (userConfirmedExit) void leaveRoomAndRedirect()
  }, [userConfirmedExit, leaveRoomAndRedirect])

  return backButton
}

export default useBackButtonGame

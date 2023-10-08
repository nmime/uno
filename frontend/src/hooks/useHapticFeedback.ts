import { GameContext } from "@contexts/Game"
import { useHapticFeedback as useHapticFeedbackSdk } from "@tma.js/sdk-react"
import { PlayerDataClass } from "common"
import { useContext, useEffect, useRef } from "react"

const useHapticFeedback = (thisPlayer: PlayerDataClass) => {
  const { game } = useContext(GameContext)
  const hapticFeedback = useHapticFeedbackSdk()

  const timeoutId = useRef(null)

  useEffect(() => {
    const activateHaptic = () => {
      if (
        game.status === "playing" &&
        game.currentPlayer === thisPlayer?.info?.id
      ) {
        hapticFeedback.impactOccurred("medium")

        const timer = () => {
          const diff = game.timer - Date.now()

          if (
            game.status === "playing" &&
            game.currentPlayer === thisPlayer?.info?.id &&
            diff > 0
          ) {
            if (diff < game.maxRoundDuration / 5)
              hapticFeedback.notificationOccurred("error")
            else if (diff < game.maxRoundDuration / 4)
              hapticFeedback.notificationOccurred("error")
            else if (diff < game.maxRoundDuration / 3)
              hapticFeedback.notificationOccurred("warning")
            else if (diff < game.maxRoundDuration / 2)
              hapticFeedback.notificationOccurred("warning")

            timeoutId.current = setTimeout(timer, game.maxRoundDuration / 8)
          }
        }

        timeoutId.current = setTimeout(timer, game.maxRoundDuration / 8)
      }
    }

    activateHaptic()

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [thisPlayer, game.currentPlayer, game.status])

  return hapticFeedback
}

export default useHapticFeedback

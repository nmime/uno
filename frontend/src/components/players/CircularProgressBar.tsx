import { GameContext } from "@contexts/Game"
import { PlayerProps } from "@players/Player"
import { useContext, useEffect, useState } from "react"

export type CircularProgressBarProps = {
  playerProps: PlayerProps
}

export default function CircularProgressBar({
  playerProps
}: CircularProgressBarProps) {
  const { game } = useContext(GameContext)

  const color =
    playerProps.player.status === "offline"
      ? "#8C8C8C"
      : playerProps.player.info.id === playerProps.currentPlayer
      ? "#c9bf07"
      : playerProps.player.ready && playerProps.currentPlayer !== null
      ? "#06860d"
      : "#0938B2"

  const [percentage, setPercentage] = useState(100)
  useEffect(() => {
    const intervalId = setInterval(() => {
      let newPercentage =
        playerProps.player.info.id === playerProps.currentPlayer
          ? ((game.maxRoundDuration - (game.timer - Date.now())) /
              game.maxRoundDuration) *
            100
          : 0
      if (newPercentage < 0) newPercentage = 0
      if (newPercentage > 100) newPercentage = 100

      setPercentage(newPercentage)
    }, 100)

    return () => clearInterval(intervalId)
  }, [playerProps, game])

  return (
    <svg className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2">
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        className="circle fill-none stroke-[5px]"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          strokeDashoffset: -(percentage / 100) * (2 * Math.PI * (0.4 * 100)),
          strokeDasharray: 2 * Math.PI * 0.385 * 100,
          stroke: color,
          strokeLinecap: "round",
          filter: `drop-shadow(0 0 3px ${color})`
        }}
      ></circle>
    </svg>
  )
}

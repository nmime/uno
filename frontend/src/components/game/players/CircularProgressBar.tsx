import { DimensionContext } from "@contexts/Dimension"
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
  const { playerSize } = useContext(DimensionContext)

  const radius = playerSize * 0.4
  const circumference = 2 * Math.PI * radius

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
    if (
      (game.status === "playing" &&
        playerProps.player.info.id === playerProps.currentPlayer) ||
      (game.status !== "playing" && game.timer)
    ) {
      const intervalId = setInterval(() => {
        const timeElapsed = Date.now() - (game.timer - game.maxRoundDuration)
        let newPercentage = (timeElapsed / game.maxRoundDuration) * 100
        newPercentage = 100 - newPercentage

        if (newPercentage < 0) newPercentage = 0
        if (newPercentage > 100) newPercentage = 100

        setPercentage(newPercentage)
      }, 100)

      return () => clearInterval(intervalId)
    } else setPercentage(100)
  }, [playerProps, game])

  return (
    <svg className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2">
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        className="circle fill-none stroke-[5px]"
        style={{
          filter: `drop-shadow(0 0 3px ${color})`,
          stroke: color,
          strokeDasharray: circumference,
          strokeDashoffset: -circumference * (1 - percentage / 100),
          strokeLinecap: "round",
          transform: "rotate(-90deg)",
          transformOrigin: "center"
        }}
      ></circle>
    </svg>
  )
}

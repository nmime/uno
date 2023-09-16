import React from "react"
import { PlayerProps } from "@players/Player"

export type CircularProgressBarProps = {
  playerProps: PlayerProps
  percentage: number
}

export default function CircularProgressBar({
  percentage,
  playerProps
}: CircularProgressBarProps) {
  const color =
    playerProps.player.status === "offline"
      ? "#8C8C8C"
      : playerProps.player.info.id === playerProps.currentPlayer
      ? "#c9bf07"
      : playerProps.player.ready && playerProps.currentPlayer !== null
      ? "#06860d"
      : "#0938B2"

  return (
    <svg className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2">
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        className="circle fill-none stroke-[5px]"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          strokeDashoffset:
            ((100 - percentage) / 100) * (2 * Math.PI * 0.4 * 100),
          strokeDasharray: 2 * Math.PI * 0.385 * 100,
          stroke: color,
          strokeLinecap: "round",
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      ></circle>
    </svg>
  )
}

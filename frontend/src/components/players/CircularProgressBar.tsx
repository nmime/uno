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
      : !playerProps.player.ready && playerProps.currentPlayer === null
      ? "#0938B2"
      : playerProps.player.info.id === playerProps.currentPlayer
      ? "#AEA708"
      : "#09890E"

  return (
    <svg className="absolute left-0 top-0 h-full w-full">
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

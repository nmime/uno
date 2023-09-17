import { useContext } from "react"
import { DimensionContext } from "@contexts/Dimension"
import { PlayerDataClass } from "common"

interface TextAroundProps {
  player: PlayerDataClass
  structure: {
    top?: number
    left?: number
  }
}

export function TextAround({ player, structure }: TextAroundProps) {
  const { playerSize } = useContext(DimensionContext)

  const radius = (playerSize / 2) * 1.25

  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 text-[--button-text-color]`}
      style={{
        margin: "0 auto",
        width: `${playerSize * 1.25}px`,
        height: `${playerSize * 1.25}px`
      }}
    >
      <svg
        viewBox={`0 0 ${playerSize * 1.25} ${playerSize * 1.3}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="circlePath"
          fill="none"
          d={`M ${(playerSize * 1.25) / 2 - radius}, ${(playerSize * 1.25) / 2}
            a ${radius},${radius} 0 0,0 ${radius * 2},0
            ${radius},${radius} 0 0,0 -${radius * 2},0`}
        ></path>
        <text id="text" fontSize="14" fontWeight="bold">
          <textPath id="textPath" href="#circlePath" startOffset="18%">
            {player.winAmount
              ? `${player.winAmount} 🪙`
              : player.cardsCount
              ? `${player.cardsCount} 🃏`
              : ""}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

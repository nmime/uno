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

  const radius = (playerSize / 2) * 1.3

  return (
    <div
      className={`fixed text-[--button-text-color]`}
      style={{
        top: structure.top! * 1.2,
        left: structure.left,
        transform: "translate(-50%, -50%)",
        width: `${playerSize * 1.2}px`,
        height: `${playerSize * 1.2}px`
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          id="circlePath"
          fill="none"
          d={`M ${50 - radius}, 50
                    a ${radius},${radius} 0 0,0 ${radius * 2},0
                    ${radius},${radius} 0 0,0 -${radius * 2},0`}
        ></path>
        <text id="text" fontSize="14" fontWeight="bold">
          <textPath id="textPath" href="#circlePath" startOffset="16%">
            {player.info.name} {radius.toFixed(1)}
            {player.winAmount
              ? `&nbsp;${player.winAmount} 🪙`
              : player.cardsCount
              ? `&nbsp;${player.cardsCount} 🃏`
              : ""}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

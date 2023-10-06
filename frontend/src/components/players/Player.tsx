import { DimensionContext } from "@contexts/Dimension"
import CircularProgressBar from "@players/CircularProgressBar"
import { Game } from "@typings/game"
import type { PlayerDataClass } from "common"
import Image from "next/image"
import { useContext } from "react"

export type PlayerProps = {
  player: PlayerDataClass
  currentPlayer: Game["currentPlayer"]
}

export default function Player({ player, currentPlayer }: PlayerProps) {
  const { playerSize } = useContext(DimensionContext)

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: `${playerSize * 1.2}px`,
        height: `${playerSize * 1.2}px`
      }}
    >
      <CircularProgressBar playerProps={{ player, currentPlayer }} />
      <div className="relative" style={{ width: `${playerSize * 0.7}px` }}>
        <Image
          className="rounded-full object-cover"
          src={`https://unogame.site/images/${player.info.id}.jpg`}
          width={playerSize}
          height={playerSize}
          priority={false}
          unoptimized={true}
          alt=""
        />
      </div>
    </div>
  )
}

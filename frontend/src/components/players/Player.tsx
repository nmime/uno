import { DimensionContext } from "@contexts/Dimension"
import CircularProgressBar from "@players/CircularProgressBar"
import { Information } from "@players/Information"
import { Game } from "@typings/game"
import type { PlayerDataClass } from "common"
import Image from "next/image"
import { useContext } from "react"

export type PlayerProps = {
  player: PlayerDataClass
  currentPlayer: Game["currentPlayer"]
  position: { top: boolean; left: boolean; right: boolean }
}

export default function Player({
  currentPlayer,
  player,
  position
}: PlayerProps) {
  const { playerSize } = useContext(DimensionContext)

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: `${playerSize * 1.2}px`,
        width: `${playerSize * 1.2}px`
      }}
    >
      <CircularProgressBar playerProps={{ currentPlayer, player, position }} />
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
      <Information player={player} position={position} />
    </div>
  )
}

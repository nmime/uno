import { DimensionContext } from "@contexts/Dimension"
import CircularProgressBar from "@players/CircularProgressBar"
import { Game } from "@typings/game"
import type { PlayerDataClass } from "common"
import Image from "next/image"
import { useContext, useState } from "react"

export type PlayerProps = {
  player: PlayerDataClass
  currentPlayer: Game["currentPlayer"]
}

const defaultAvatar = "/assets/avatar.png"

export default function Player({ player, currentPlayer }: PlayerProps) {
  const { playerSize } = useContext(DimensionContext)

  const [src, setSrc] = useState(
    `https://unogame.site/images/${player.info.id}.jpg`
  )

  const percentage = 100

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: `${playerSize * 1.2}px`,
        height: `${playerSize * 1.2}px`
      }}
    >
      <CircularProgressBar
        playerProps={{ player, currentPlayer }}
        percentage={percentage}
      />
      <div className="relative" style={{ width: `${playerSize * 0.7}px` }}>
        <Image
          className="rounded-full object-cover"
          src={src}
          width={playerSize}
          height={playerSize}
          priority={false}
          onError={() => setSrc(defaultAvatar)}
          blurDataURL={defaultAvatar}
          alt=""
          placeholder="blur"
        />
      </div>
    </div>
  )
}

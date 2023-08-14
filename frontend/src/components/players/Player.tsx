import type { PlayerDataClass } from "common"
import Image from "next/image"
import { useState } from "react"
import CircularProgressBar from "@players/CircularProgressBar"
import { Game } from "@contexts/Game"

export type PlayerProps = {
  player: PlayerDataClass
  currentPlayer: Game["currentPlayer"]
}

const defaultAvatar = "https://unogame.site/images/avatar.png"

export default function Player({ player, currentPlayer }: PlayerProps) {
  const [src, setSrc] = useState(
    `https://unogame.site/images/${player.info.id}.jpg`
  )

  const color =
    player.status === "offline"
      ? "grey"
      : !player.ready
      ? "blue"
      : player.info.id === currentPlayer
      ? "yellow"
      : "green"
  const percentage = 100

  return (
    <div className="relative mt-3 h-20 w-20 p-[44px]">
      <CircularProgressBar color={color} percentage={percentage} />
      <div className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2">
        <Image
          className="rounded-full object-cover"
          src={src}
          width={160}
          height={160}
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

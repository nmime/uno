import type { PlayerDataClass } from "common"
import Image from "next/image"
import { useState } from "react"

export type PlayerProps = {
  player: PlayerDataClass
  currentPlayer: number
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

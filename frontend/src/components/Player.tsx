import type { PlayerDataClass } from "common"
import Image from "next/image"

export type PlayerProps = {
  player: PlayerDataClass
  currentPlayer: number
}

export default function Player({ player, currentPlayer }: PlayerProps) {
  const color = !player.ready
    ? "blue"
    : player.info.id === currentPlayer
    ? "yellow"
    : player.status === "offline"
    ? "grey"
    : "green"
  const percentage = 100

  return (
    <div className="relative mt-3 h-20 w-20 p-[47px]">
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
          src={`https://unogame.site/images/${player.info.id}.jpg`}
          width={160}
          height={160}
          priority={false}
          alt=""
        />
      </div>
    </div>
  )
}

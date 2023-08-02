import type { PlayerDataClass } from "common"
import Image from "next/image"

export type PlayerProps = {
  player: PlayerDataClass
}

export default function Player({
  player: {
    info: { id }
  }
}: PlayerProps) {
  const color = "yellow"

  return (
    <div className="relative mt-2 h-20 w-20 p-[47px]">
      <svg className="absolute left-0 top-0 h-full w-full">
        <circle
          cx="50%"
          cy="50%"
          r="40%"
          className="circle fill-none stroke-[5px]"
          style={{
            strokeDashoffset: 440,
            strokeDasharray: 440,
            stroke: color,
            strokeLinecap: "round",
            filter: `drop-shadow(0 0 4px ${color})`,
            animation: "anim_circle 1s ease-in-out forwards"
          }}
        ></circle>
      </svg>
      <div className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2">
        <Image
          className="rounded-full object-cover"
          src={`https://unogame.site/images/${id}.jpg`}
          width={160}
          height={160}
          priority={false}
          alt=""
        />
      </div>
    </div>
  )
}

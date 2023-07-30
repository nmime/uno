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
  return (
    <div className="h-16 w-16">
      <Image
        className="rounded-full object-cover object-center"
        src={`https://unogame.site/images/${id}.jpg`}
        width={160}
        height={160}
        alt=""
      />
    </div>
  )
}

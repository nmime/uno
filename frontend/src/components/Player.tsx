import type { PlayerDataClass } from "common"

export type PlayerProps = {
  player: PlayerDataClass
}

export default function Player({
  player: {
    info: { id, name }
  }
}: PlayerProps) {
  return (
    <div className="h-16 w-16">
      <img
        className="h-full w-full rounded-full object-cover object-center"
        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  )
}

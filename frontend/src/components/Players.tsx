import Player from "@components/Player"
import type { PlayerDataClass } from "common"
import { MapSchema } from "@colyseus/schema"

type PlayersProps = {
  players: MapSchema<PlayerDataClass, string>
}

type Structure = {
  top: number
  left?: number
  right?: number
}

export default function Players({ players }: PlayersProps) {
  const playersArray = Array.from(players, (entry) => entry[1])

  const width = window.innerWidth
  const height = window.innerHeight

  const gaps = players.size + 1

  const widthGap = width / (gaps > 4 ? 4 : gaps)
  const heightGap = (height * 0.7) / (gaps > 3 ? 3 : gaps)

  let counter = 0

  return (
    <div className="relative h-screen w-screen">
      {playersArray.map((player, index) => {
        counter = index % 3 !== 0 && counter !== 0 ? counter : counter + 1

        const currentGap =
          index % 3 === 0 ? heightGap * counter : widthGap * counter

        const structure = {
          top: index % 3 === 0 ? 0 : currentGap
        } as Structure
        if (index % 3 === 0) structure.left = currentGap - widthGap
        if (index % 3 === 1) structure.left = 0
        if (index % 3 === 2) structure.right = 0

        return (
          <div
            className={`absolute p-4`}
            key={player.info.id}
            style={structure}
          >
            <Player player={player} />
          </div>
        )
      })}
    </div>
  )
}

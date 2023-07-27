import Player from "@components/Player"
import type { PlayerDataClass } from "common"

type PlayersProps = {
  players: Map<string, PlayerDataClass>
  currentPlayer: PlayerDataClass
}

type Structure = {
  top: number
  left?: number
  right?: number
}

export default function Players({ players, currentPlayer }: PlayersProps) {
  const playersArray = Array.from(players, (entry) => entry[1]).filter(
    (player) => player.info.id !== currentPlayer.info.id
  )

  const width = window.innerWidth
  const height = window.innerHeight

  const gaps = playersArray.length + 1

  const widthGap = width / (gaps > 4 ? 4 : gaps)
  const heightGap = (height * 0.6) / (gaps > 3 ? 3 : gaps)

  let counter = 0

  return (
    <div className="relative h-screen w-screen">
      {playersArray.map((player, index) => {
        counter = index % 3 !== 0 && counter !== 0 ? counter : counter + 1

        const currentGap =
          index % 3 === 0 ? widthGap * counter : heightGap * counter

        const structure = {
          top: index % 3 === 0 ? 0 : currentGap
        } as Structure
        if (index % 3 === 0) structure.left = currentGap - widthGap * 0.45
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

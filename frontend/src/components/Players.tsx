import Player from "@components/Player"
import type { PlayerDataClass } from "common"

type PlayersProps = {
  players: Map<string, PlayerDataClass>
  currentPlayer: number
  thisPlayer: PlayerDataClass
}

type Structure = {
  top: number
  left?: number
  right?: number
  transform?: string
}

export default function Players({
  players,
  currentPlayer,
  thisPlayer
}: PlayersProps) {
  const playersArray = Array.from(players, (entry) => entry[1]).filter(
    (player) => player.info.id !== thisPlayer.info.id
  )

  const width = window.innerWidth
  const height = window.innerHeight

  const playersCount = playersArray.length

  const widthGap = width / (playersCount <= 3 ? 2 : playersCount <= 6 ? 3 : 4)
  const heightGap =
    height / (playersCount <= 3 ? 2 : playersCount <= 6 ? 3 : 4) - 15
  const shift = 32 * 1.3

  let counter = 0

  return (
    <div className="fixed">
      {playersArray.map((player, index) => {
        counter = index % 3 !== 0 && counter !== 0 ? counter : counter + 1

        const currentGap =
          index % 3 === 0 ? widthGap * counter : heightGap * counter

        const structure = {
          top: index % 3 === 0 ? shift : currentGap
        } as Structure
        if (index % 3 === 0) structure.left = currentGap
        if (index % 3 === 1) structure.left = shift
        if (index % 3 === 2) structure.left = width - shift
        structure.transform = "translate(-50%, -50%)"

        return (
          <div
            className={`fixed`}
            key={player.info.id + index}
            style={structure}
          >
            <Player player={player} currentPlayer={currentPlayer} />
          </div>
        )
      })}
    </div>
  )
}

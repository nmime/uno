import Player from "@players/Player"
import type { PlayerDataClass } from "common"
import { shiftArray } from "@utils/shiftArray"
import { rearrange } from "@utils/rearrange"
import { Game } from "@contexts/Game"
import { useContext } from "react"
import { DimensionContext } from "@contexts/Dimension"

type PlayersProps = {
  players: Game["players"]
  currentPlayer: Game["currentPlayer"]
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
  const { playerSize } = useContext(DimensionContext)
  const { width, height } = useContext(DimensionContext)

  let playersArray = Array.from(players.values())
  playersArray = shiftArray(
    playersArray,
    -playersArray.findIndex((player) => player.info.id === thisPlayer.info.id)
  )
  playersArray = rearrange(playersArray.slice(1, playersArray.length))

  const playersCount = playersArray.length

  const widthGap = width / (playersCount <= 3 ? 2 : playersCount <= 6 ? 3 : 4)
  const heightGap =
    height / (playersCount <= 3 ? 2 : playersCount <= 6 ? 3 : 4) - 15
  const shift = 32 * 1.3

  let counter = 0

  return (
    <div>
      {playersArray.map((player, index) => {
        const top = index % 3 === 0
        counter = !top && counter !== 0 ? counter : counter + 1
        const currentGap = top ? widthGap * counter : heightGap * counter

        const structure = {
          top: top ? shift : currentGap,
          transform: "translate(-50%, -50%)"
        } as Structure
        if (top) structure.left = currentGap
        if (index % 3 === 1) structure.left = shift
        if (index % 3 === 2) structure.left = width - shift

        return (
          <>
            <div
              className={`fixed`}
              key={player.info.id + index}
              style={structure}
            >
              <Player player={player} currentPlayer={currentPlayer} />
            </div>
            <div
              className={`fixed text-[--button-text-color]`}
              style={{
                top: structure.top * 1.2,
                left: structure.left,
                transform: "translate(-50%, -50%)",
                width: `${playerSize * 1.2}px`,
                height: `${playerSize * 1.2}px`
              }}
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                  id="circlePath"
                  fill="none"
                  d={`M ${50 - playerSize / 2}, 50
                    a ${playerSize / 2},${playerSize / 2} 0 0,0 ${playerSize},0
                    ${playerSize / 2},${playerSize / 2} 0 0,0 -${playerSize},0`}
                ></path>
                <text id="text" fontSize="14" fontWeight="bold">
                  <textPath id="textPath" href="#circlePath" startOffset="15%">
                    {player.info.name}
                    {player.winAmount
                      ? ` ${player.winAmount} 🪙`
                      : player.cardsCount
                      ? ` ${player.cardsCount} 🃏`
                      : ""}
                  </textPath>
                </text>
              </svg>
            </div>
          </>
        )
      })}
    </div>
  )
}

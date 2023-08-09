"use client"

import { useContext } from "react"
import { GameContext } from "@contexts/Game"
import Players from "@components/Players"
import { useInitData } from "@twa.js/sdk-react"
import WaitingBanner from "@components/WaitingBanner"
import CardTable from "@components/CardTable"

export default function Game() {
  const initData = useInitData()
  const { game } = useContext(GameContext)

  if (!Object.keys(game).length || initData === null || initData.user === null)
    return

  const thisPlayer = game.players.get(String(initData.user.id))
  if (!thisPlayer) return

  return (
    <div>
      <Players
        players={game.players}
        currentPlayer={game.currentPlayer}
        thisPlayer={thisPlayer}
      />
      {game.status === "playing" ? (
        <CardTable
          currentCard={game.currentCardParams}
          currentPlayer={thisPlayer}
          isCurrentMove={game.currentPlayer === thisPlayer.info.id}
          isDirectionClockwise={game.isDirectionClockwise}
        />
      ) : (
        <WaitingBanner player={thisPlayer} />
      )}
    </div>
  )
}

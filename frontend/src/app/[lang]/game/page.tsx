"use client"

import { useContext } from "react"
import { GameContext } from "@contexts/Game"
import Players from "@players/index"
import CardTable from "@table/index"
import { useInitData } from "@twa.js/sdk-react"
import WaitingBanner from "@components/WaitingBanner"

export default function Game() {
  const initData = useInitData()
  const { game } = useContext(GameContext)

  if (!Object.keys(game).length || initData === null || initData.user === null)
    return

  const thisPlayer = game.players.get(String(initData.user.id))
  if (!thisPlayer) return

  console.log(thisPlayer, "thisPlayer")

  return (
    <div>
      <Players
        players={game.players}
        currentPlayer={game.currentPlayer}
        thisPlayer={thisPlayer}
      />
      {game.status === "playing" ? (
        <CardTable game={game} thisPlayer={thisPlayer} />
      ) : (
        <WaitingBanner player={thisPlayer} />
      )}
    </div>
  )
}

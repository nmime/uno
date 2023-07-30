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

  const currentPlayer = game.players.get(String(initData.user.id))

  if (!currentPlayer) return

  return (
    <div className="">
      <Players players={game.players} currentPlayer={currentPlayer} />
      {game.status === "playing" ? (
        <CardTable
          currentCard={game.currentCardParams}
          cards={currentPlayer.cards}
        />
      ) : (
        <WaitingBanner player={currentPlayer} />
      )}
    </div>
  )
}

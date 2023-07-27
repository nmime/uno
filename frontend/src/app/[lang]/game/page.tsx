"use client"

import { useContext } from "react"
import { GameContext } from "@contexts/Game"
import Players from "@components/Players"
import MainCard from "@components/MainCard"
import CardFan from "@components/CardFan"
import { useInitData } from "@twa.js/sdk-react"
import WaitingBanner from "@components/WaitingBanner"

export default function Game() {
  const initData = useInitData()
  const { game } = useContext(GameContext)

  if (!Object.keys(game).length || initData === null || initData.user === null)
    return

  const currentPlayer = game.players.get(String(initData.user.id))

  if (!currentPlayer) return

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <Players players={game.players} currentPlayer={currentPlayer} />
      {game.status === "playing" ? (
        <div className="flex w-full flex-grow items-center justify-center">
          <MainCard card={game.currentCardParams} />
          <CardFan cards={currentPlayer.cards} />
        </div>
      ) : (
        <WaitingBanner player={currentPlayer} />
      )}
    </div>
  )
}

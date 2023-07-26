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
  const game = useContext(GameContext)

  if (game === null || initData === null || initData.user === null) return

  const currentPlayer = game.players.get(String(initData.user.id))

  if (!currentPlayer) return

  return (
    <>
      <Players players={game.players} />
      {game.status === "playing" ? (
        <>
          <MainCard card={game.currentCardParams} />
          <CardFan cards={currentPlayer.cards} />
        </>
      ) : (
        <WaitingBanner />
      )}
    </>
  )
}

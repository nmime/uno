"use client"

import { useContext } from "react"
import { GameContext } from "@contexts/Game"
import Players from "@players/index"
import CardTable from "@table/index"
import { useInitData } from "@twa.js/sdk-react"
import WaitingBanner from "@components/WaitingBanner"
import { PlayerDataClass } from "common"

export default function Game() {
  const initData = useInitData()
  const { game } = useContext(GameContext)

  if (!Object.keys(game).length || initData === null || initData.user === null)
    return

  let thisPlayer = game.players.get(String(initData.user.id))
  if (!thisPlayer)
    thisPlayer = {
      info: game.visitors.get(String(initData.user.id)),
      playerState: null
    } as PlayerDataClass

  const participants = new Map<string, PlayerDataClass>(game.players)
  if (game.status !== "playing") {
    participants.clear()

    game.visitors.forEach((value, key) => {
      if (!participants.has(key)) {
        const player = new PlayerDataClass()
        player.info = value

        participants.set(key, player)
      }
    })

    game.players.forEach((value, key) => {
      participants.set(key, value)
    })
  }

  return (
    <div>
      <Players
        players={participants}
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

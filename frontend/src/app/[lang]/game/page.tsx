"use client"

import { Balance } from "@components/Balance"
import WaitingBanner from "@components/WaitingBanner"
import { GameContext } from "@contexts/Game"
import Players from "@players/index"
import CardTable from "@table/index"
import getParticipants from "@utils/getParticipants"
import { useContext } from "react"

import useBackButton from "@/hooks/useBackButton"
import useMainButton from "@/hooks/useMainButton"
import useThisPlayer from "@/hooks/useThisPlayer"

export default function Game() {
  const { game } = useContext(GameContext)

  const thisPlayer = useThisPlayer()
  useMainButton(thisPlayer)
  useBackButton()

  if (!Object.keys(game).length || !Object.keys(thisPlayer).length) return null

  const participants = getParticipants(game)

  return (
    <div>
      <Balance bet={game.bet} />
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

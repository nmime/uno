"use client"

import { Balance } from "@components/Balance"
import Loading from "@components/Loading"
import WaitingBanner from "@components/WaitingBanner"
import { GameContext } from "@contexts/Game"
import useBackButtonGame from "@hooks/useBackButtonGame"
import useHapticFeedback from "@hooks/useHapticFeedback"
import useMainButton from "@hooks/useMainButton"
import useThisPlayer from "@hooks/useThisPlayer"
import Players from "@players/index"
import CardTable from "@table/index"
import getParticipants from "@utils/getParticipants"
import { useContext } from "react"

export default function Game() {
  const { game } = useContext(GameContext)

  const thisPlayer = useThisPlayer()
  useMainButton(thisPlayer)
  useBackButtonGame()
  useHapticFeedback(thisPlayer)

  if (!Object.keys(game).length || thisPlayer === null) return <Loading />

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

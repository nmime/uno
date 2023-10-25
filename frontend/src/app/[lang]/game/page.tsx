"use client"

import Loading from "@components/Loading"
import { GameContext } from "@contexts/Game"
import { Balance } from "@game/Balance"
import BottomLine from "@game/BottomLine"
import WaitingBanner from "@game/WaitingBanner"
import useBackButtonGame from "@hooks/useBackButtonGame"
import useHapticFeedback from "@hooks/useHapticFeedback"
import useThisPlayer from "@hooks/useThisPlayer"
import Players from "@players/index"
import CardTable from "@table/index"
import getParticipants from "@utils/getParticipants"
import React, { useContext } from "react"

export default function Game() {
  const { game } = useContext(GameContext)

  const thisPlayer = useThisPlayer()
  useBackButtonGame()
  useHapticFeedback(thisPlayer)

  if (!Object.keys(game).length || thisPlayer === null || !thisPlayer)
    return <Loading />

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
        <>
          <CardTable game={game} thisPlayer={thisPlayer} />
          <BottomLine thisPlayer={thisPlayer} />
        </>
      ) : (
        <WaitingBanner player={thisPlayer} />
      )}
    </div>
  )
}

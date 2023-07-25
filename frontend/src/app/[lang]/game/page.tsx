"use client"

import {useContext} from "react"
import {GameContext} from "@contexts/Game"

export default function Game() {
  const game = useContext(GameContext)

  return <p>{JSON.stringify(game?.toJSON())}</p>
}

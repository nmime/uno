"use client"

import GamesList from "@components/GamesList"
import Navigation from "@components/Navigation"
import { useBackButton } from "@tma.js/sdk-react"
import { useEffect } from "react"

export default function Home() {
  const backButton = useBackButton()
  useEffect(() => {
    backButton.hide()
  }, [])

  return (
    <div>
      <GamesList />
      <Navigation />
    </div>
  )
}

"use client"

import Navigation from "@components/Navigation"
import GamesList from "@components/GamesList"
import { useBackButton } from "@twa.js/sdk-react"

export default function Home() {
  const backButton = useBackButton()
  backButton.hide()

  return (
    <div>
      <GamesList />
      <Navigation />
    </div>
  )
}

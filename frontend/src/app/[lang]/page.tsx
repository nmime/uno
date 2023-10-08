"use client"

import GamesList from "@components/GamesList"
import Navigation from "@components/Navigation"
import { useBackButton, useMainButton } from "@tma.js/sdk-react"

export default function Home() {
  const backButton = useBackButton()
  backButton.hide()

  const mainButton = useMainButton()
  mainButton.hide()

  return (
    <div>
      <GamesList />
      <Navigation />
    </div>
  )
}

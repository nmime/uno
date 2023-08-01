"use client"

import Navigation from "@components/Navigation"
import GamesList from "@components/GamesList"

export default function Home() {
  return (
    <div>
      <GamesList />
      <Navigation />
    </div>
  )
}

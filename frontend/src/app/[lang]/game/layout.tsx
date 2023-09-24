import { GameProvider } from "@contexts/Game"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default async function GameLayout({ children }: Props) {
  return <GameProvider>{children}</GameProvider>
}

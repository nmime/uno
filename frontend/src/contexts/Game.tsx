"use client"

import {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react"
import type { Game } from "common"
import { client } from "@services/colyseus"
import { usePathname, useSearchParams } from "next/navigation"

import onMessage from "@events/onMessage"
import onStateChange from "@events/onStateChange"
import onError from "@events/onError"
import onLeave from "@events/onLeave"
import { useInitData } from "@twa.js/sdk-react"

export const GameContext: Context<Game | null> = createContext<Game | null>(
  null
)

export function GameProvider({ children }: PropsWithChildren) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const initData = useInitData()

  const [game, setGame] = useState<Game | null>(null)
  const [gameId, setGameId] = useState(searchParams.get("tgWebAppStartParam"))

  useEffect(() => {
    const fetchGameServer = async () => {
      if (initData === null || initData.user === null) return

      const options = {
        id: initData.user.id,
        name: initData.user.firstName,
        lang: initData.user.languageCode
      }

      const room =
        gameId === null
          ? await client.joinOrCreate<Game>("game", options)
          : await client.joinById<Game>(gameId, options)

      setGame(room.state)

      room.onMessage("game", onMessage)
      room.onStateChange(onStateChange)
      room.onError(onError)
      room.onLeave(onLeave)
    }

    if (pathname.includes("/game")) fetchGameServer()

    return () => {}
  }, [gameId, pathname, initData])

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}

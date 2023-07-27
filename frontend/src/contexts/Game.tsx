"use client"

import {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react"
import type {
  CardDataClass,
  GameStatus,
  GameType,
  MyState,
  PlayerDataClass
} from "common"
import { client } from "@services/colyseus"
import { usePathname, useSearchParams } from "next/navigation"
import onMessage from "@events/onMessage"
import onError from "@events/onError"
import onLeave from "@events/onLeave"
import { useInitData } from "@twa.js/sdk-react"
import { serialize } from "@utils/serialize"
import { Room } from "colyseus.js"

export interface Game {
  bet: number
  createdAt: number
  maxPlayers: number
  maxRoundDuration: number

  isDirectionClockwise: boolean
  type: GameType
  status: GameStatus
  currentPlayer: number

  currentCardParams: CardDataClass

  players: Map<string, PlayerDataClass>
}

type GameProps = {
  game: Game
  room: Room<MyState>
}
export const GameContext: Context<GameProps> = createContext<GameProps>(
  {} as GameProps
)

export function GameProvider({ children }: PropsWithChildren) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const initData = useInitData()

  const [game, setGame] = useState<Game>({} as Game)
  const [room, setRoom] = useState<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = useState(searchParams.get("tgWebAppStartParam"))

  useEffect(() => {
    const fetchGameServer = async () => {
      if (initData === null || initData.user === null) return

      const options = {
        id: initData.user.id,
        name: initData.user.firstName,
        lang: initData.user.languageCode
      }

      const connect =
        gameId === null
          ? await client.joinOrCreate<MyState>("game", options)
          : await client.joinById<MyState>(gameId, options)

      setRoom(connect)

      setGame(serialize(connect.state.toJSON() as Game))

      connect.onMessage("game", onMessage)
      connect.onStateChange((state) => {
        setGame(serialize(state.toJSON() as Game))
      })
      connect.onError(onError)
      connect.onLeave(onLeave)
    }

    if (pathname.includes("/game")) fetchGameServer()

    return () => {}
  }, [gameId, pathname, initData])

  return (
    <GameContext.Provider value={{ game, room }}>
      {children}
    </GameContext.Provider>
  )
}

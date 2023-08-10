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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import onMessage from "@events/onMessage"
import { useInitData } from "@twa.js/sdk-react"
import { serialize } from "@utils/serialize"
import { Room } from "colyseus.js"
import { client } from "@services/colyseus"

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
  const { lang } = useParams()
  const initData = useInitData()
  const router = useRouter()

  const [game, setGame] = useState<Game>({} as Game)
  const [room, setRoom] = useState<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = useState(searchParams.get("tgWebAppStartParam"))

  const connectToGame = async () => {
    if (initData === null || initData.user === null) return

    const player = {
      id: initData.user.id,
      name: initData.user.firstName,
      language: initData.user.languageCode
    }
    const params = {
      player,
      id: gameId
    }

    let connect: Room<MyState>
    try {
      connect =
        gameId === null
          ? searchParams.get("create")
            ? await client.create<MyState>("game", params)
            : await client.joinOrCreate<MyState>("game", params)
          : await client.joinById<MyState>(gameId, params)
    } catch (e) {
      connect = await client.joinOrCreate<MyState>("game", params)
    }

    connect.onMessage("game", onMessage)
    connect.onStateChange((state) => {
      setGame(serialize(state.toJSON() as Game))
      console.log(state.toJSON(), "onStateChange")
    })
    connect.onError((code, message) => {
      console.log(code, message, "onError")
    })
    connect.onLeave(async (code) => {
      console.log(code, "onLeave")
      await connectToGame()
    })

    setRoom(connect)
    setGameId(connect.roomId)
    setGame(serialize(connect.state.toJSON() as Game))

    router.replace(`/${lang}/game?tgWebAppStartParam=${connect.roomId}`)
  }

  useEffect(() => {
    if (pathname.includes("game")) {
      if (room.roomId !== gameId || !room.connection?.isOpen) connectToGame()
    } else {
      setRoom({} as Room<MyState>)
      setGame({} as Game)
      setGameId(null)
    }

    return () => {}
  }, [gameId, pathname])

  return (
    <GameContext.Provider value={{ game, room }}>
      {children}
    </GameContext.Provider>
  )
}

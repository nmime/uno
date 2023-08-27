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
import { CardColorsDefault, PlayerClass } from "common"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import onMessage from "@events/onMessage"
import { useInitData } from "@twa.js/sdk-react"
import { Room } from "colyseus.js"
import { client } from "@services/colyseus"
import { serialize } from "@utils/serialize"

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
  chosenColor: CardColorsDefault | null

  players: Map<string, PlayerDataClass>
  visitors: Map<string, PlayerClass>
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

    const maxAttempts = 15
    const delay = 1000

    const tryConnect = async (): Promise<Room<MyState> | null> => {
      let attempts = 0

      while (attempts < maxAttempts) {
        try {
          if (gameId === null) {
            return searchParams.get("create")
              ? await client.create<MyState>("game", params)
              : await client.joinOrCreate<MyState>("game", params)
          } else {
            try {
              return await client.joinById<MyState>(gameId, params)
            } catch (e) {
              return await client.create<MyState>("game", params)
            }
          }
        } catch (e) {
          console.error(e, gameId)
          attempts++

          if (attempts >= maxAttempts) return null

          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }

      return null
    }

    const connectToGame = async () => {
      const connect = await tryConnect()

      if (connect === null) return

      const updateState = (state: MyState) => {
        const gameState = state.toJSON() as Game

        serialize(state, gameState)

        setGame(gameState)
        console.log(gameState, "onStateChange")
      }

      connect.onMessage("game", onMessage)
      connect.onStateChange((state) => updateState(state))
      connect.onError((code, message) => {
        console.log(code, message, "onError")
      })
      connect.onLeave(async (code) => {
        console.log(code, "onLeave")

        if (code !== 4000) await connectToGame()
      })

      setGameId(connect.roomId)
      setRoom(connect)
      updateState(connect.state)

      router.replace(`/${lang}/game?tgWebAppStartParam=${connect.roomId}`)
    }

    await connectToGame()
  }

  useEffect(() => {
    if (pathname.includes("game")) {
      if (
        searchParams.get("tgWebAppStartParam") !== gameId ||
        !room.connection?.isOpen
      )
        connectToGame()
    } else {
      if (typeof room.connection?.isOpen !== "undefined") room.leave()

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

"use client"

import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react"
import type {
  CardDataClass,
  GameStatus,
  GameType,
  MessageInput,
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
import { useInitData } from "@twa.js/sdk-react"
import { Room } from "colyseus.js"
import { establishConnect } from "@services/establishConnect"
import { ToastContext } from "@contexts/ToastError"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("error")
  const showToast = useContext(ToastContext)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { lang } = useParams()
  const initData = useInitData()
  const router = useRouter()

  const [game, setGame] = useState<Game>({} as Game)
  const [room, setRoom] = useState<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = useState(searchParams.get("tgWebAppStartParam"))

  useEffect(() => {
    const asyncHack = async () => {
      console.log(
        "beforeConnection",
        `gameId: ${gameId}`,
        `roomId: ${room.roomId}`,
        `pathname: ${pathname}`,
        `isOpen: ${room.connection?.isOpen}`,
        `connectToGame: ${room.roomId !== gameId || !room.connection?.isOpen}`,
        `startParams: ${searchParams.get("tgWebAppStartParam")}`,
        pathname.includes("game")
      )

      if (pathname.includes("game")) {
        if (
          searchParams.get("tgWebAppStartParam") !== gameId ||
          !room.connection?.isOpen
        ) {
          const connect = await establishConnect(
            initData,
            !searchParams.get("tgWebAppStartParam")
              ? undefined
              : searchParams.get("tgWebAppStartParam").split("_")[0],
            !searchParams.get("tgWebAppStartParam")
              ? undefined
              : !!searchParams.get("tgWebAppStartParam").split("_")[1],
            searchParams.get("create") === "true",
            Number(searchParams.get("bet")),
            setGame
          )

          connect.onMessage("game", (message: MessageInput) => {
            console.log("onMessage", message, showToast)

            if (!message.ok && showToast) {
              showToast(t(message.type))
            }
          })

          localStorage.setItem("lastGame", searchParams.get(connect.roomId))
          localStorage.setItem(
            "lastGameReconnectionToken",
            room.reconnectionToken
          )

          setGameId(connect.roomId)
          setRoom(connect)

          router.replace(`/${lang}/game?tgWebAppStartParam=${connect.roomId}`)

          console.log(
            "afterConnection",
            `gameId: ${gameId}`,
            `roomId: ${room.roomId}`,
            `pathname: ${pathname}`,
            `isOpen: ${room.connection?.isOpen}`,
            `connectToGame: ${
              room.roomId !== gameId || !room.connection?.isOpen
            }`,
            `startParams: ${searchParams.get("tgWebAppStartParam")}`,
            pathname.includes("game")
          )
        }
      } else {
        if (typeof room.connection?.isOpen !== "undefined") await room.leave()

        setRoom({} as Room<MyState>)
        setGame({} as Game)
        setGameId(null)
      }
    }

    void asyncHack()
  }, [pathname])

  return (
    <GameContext.Provider value={{ game, room }}>
      {children}
    </GameContext.Provider>
  )
}

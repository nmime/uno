"use client"

import { ToastContext } from "@contexts/ToastError"
import { establishConnect } from "@services/establishConnect"
import { useInitData, useSDK } from "@tma.js/sdk-react"
import { Game } from "@typings/game"
import { Room } from "colyseus.js"
import type { MessageInput, MyState } from "common"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation"
import { useTranslations } from "next-intl"
import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react"

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
  const router = useRouter()

  const { lang } = useParams()
  const initData = useInitData()
  const {
    components: { initDataRaw }
  } = useSDK()

  const [game, setGame] = useState<Game>({} as Game)
  const [room, setRoom] = useState<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = useState(searchParams.get("tgWebAppStartParam"))

  useEffect(() => {
    const asyncHack = async () => {
      if (pathname.includes("game")) {
        if (room.roomId !== gameId || !room.connection?.isOpen) {
          const parse = searchParams.get("tgWebAppStartParam")
            ? searchParams.get("tgWebAppStartParam").split("_")
            : []

          const privateGame = searchParams.get("private")
            ? searchParams.get("private") === "true"
            : !!parse[1]
          const doCreate = searchParams.get("create")
            ? searchParams.get("create") === "true"
            : !!parse[2]
          const bet = !isNaN(Number(searchParams.get("bet")))
            ? Number(searchParams.get("bet"))
            : !isNaN(Number(parse[3]))
            ? Number(parse[3])
            : undefined
          const minPlayers = !isNaN(Number(searchParams.get("minPlayers")))
            ? Number(searchParams.get("minPlayers"))
            : !isNaN(Number(parse[4]))
            ? Number(parse[4])
            : undefined
          const maxPlayers = !isNaN(Number(searchParams.get("maxPlayers")))
            ? Number(searchParams.get("maxPlayers"))
            : !isNaN(Number(parse[5]))
            ? Number(parse[5])
            : undefined

          const connect = await establishConnect(
            initData,
            initDataRaw,
            parse[0],
            privateGame,
            doCreate,
            bet,
            minPlayers,
            maxPlayers,
            setGame
          )

          if (connect === null) return router.replace(`/${lang}/`)

          connect.onMessage("game", (message: MessageInput) => {
            if (!message.ok && showToast) showToast(t(message.type))
          })

          localStorage.setItem(
            `${initData.user.id}_lastGameReconnectionToken`,
            connect.reconnectionToken
          )

          setGameId(connect.roomId)
          setRoom(connect)

          router.replace(
            `/${lang}/game?tgWebAppStartParam=${connect.roomId}&private=${privateGame}&create=${doCreate}&bet=${bet}&minPlayers=${minPlayers}&maxPlayers=${maxPlayers}`
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
  }, [])

  return (
    <GameContext.Provider value={{ game, room }}>
      {children}
    </GameContext.Provider>
  )
}

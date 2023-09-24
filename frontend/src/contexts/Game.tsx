"use client"

import { ToastContext } from "@contexts/ToastError"
import { establishConnect } from "@services/establishConnect"
import { useInitData } from "@twa.js/sdk-react"
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
        `isOpen: ${room.connection?.isOpen}`,
        `pathname: ${pathname}`,
        `startParams: ${searchParams.get("tgWebAppStartParam")}`,
        `ableConnectToGame: ${
          room.roomId !== gameId || !room.connection?.isOpen
        }`
      )

      if (pathname.includes("game")) {
        if (room.roomId !== gameId || !room.connection?.isOpen) {
          const parse = searchParams.get("tgWebAppStartParam")
            ? searchParams.get("tgWebAppStartParam").split("_")
            : []
          const connect = await establishConnect(
            initData,
            parse[0],
            searchParams.get("private")
              ? searchParams.get("private") === "true"
              : !!parse[1],
            searchParams.get("create")
              ? searchParams.get("create") === "true"
              : !!parse[2],
            !isNaN(Number(searchParams.get("bet")))
              ? Number(searchParams.get("bet"))
              : !isNaN(Number(parse[3]))
              ? Number(parse[3])
              : undefined,
            setGame
          )

          connect.onMessage("game", (message: MessageInput) => {
            console.log("onMessage", message, showToast)

            if (!message.ok && showToast) {
              showToast(t(message.type))
            }
          })

          localStorage.setItem(
            `${initData.user.id}_lastGameReconnectionToken`,
            connect.reconnectionToken
          )

          setGameId(connect.roomId)
          setRoom(connect)

          router.replace(`/${lang}/game?tgWebAppStartParam=${connect.roomId}`)

          console.log(
            "afterConnection",
            `gameId: ${gameId}`,
            `roomId: ${connect.roomId}`,
            `isOpen: ${connect.connection?.isOpen}`,
            `pathname: ${pathname}`,
            `startParams: ${searchParams.get("tgWebAppStartParam")}`,
            `ableConnectToGame: ${
              connect.roomId !== gameId || !connect.connection?.isOpen
            }`
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

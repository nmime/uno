import { client } from "@services/colyseus"
import { InitResult } from "@tma.js/sdk-react"
import { Game } from "@typings/game"
import { getUser } from "@utils/getUser"
import { serialize } from "@utils/serialize"
import { Room } from "colyseus.js"
import { MyState } from "common"
import { Dispatch, SetStateAction } from "react"

export const establishConnect = async (
  initData: InitResult["initData"] | null,
  initDataRaw: string | undefined,
  gameId: string | null,
  privateGame: boolean,
  doCreate: boolean,
  bet: number,
  minPlayers: number,
  maxPlayers: number,
  setGame: Dispatch<SetStateAction<Game>>
): Promise<Room> => {
  if (initData === null || initData.user === null) throw Error("no initData")

  const player = {
    id: initData.user.id,
    name: initData.user.firstName
  }
  const params = JSON.parse(
    JSON.stringify({
      bet,
      id: gameId,
      initDataRaw,
      maxPlayers,
      minPlayers,
      player,
      privateGame
    })
  )

  const maxAttempts = 30
  const delay = 100

  const tryConnect = async (): Promise<Room<MyState> | null> => {
    let attempts = 0

    let reconnectionToken = localStorage.getItem(
      `${initData.user.id}_lastGameReconnectionToken`
    )

    while (attempts < maxAttempts) {
      try {
        if (
          (gameId && gameId !== reconnectionToken?.split(":")[0]) ||
          (gameId && !reconnectionToken)
        ) {
          try {
            return await client.joinById<MyState>(gameId, params)
          } catch (e) {
            return await client.create<MyState>("game", params)
          }
        } else if (reconnectionToken)
          return await client.reconnect(reconnectionToken)
        else {
          return doCreate
            ? await client.create<MyState>("game", params)
            : await client.joinOrCreate<MyState>("game", params)
        }
      } catch (e) {
        console.error(e, gameId, params)
        attempts++

        if (attempts >= maxAttempts) return null

        await new Promise((resolve) =>
          setTimeout(resolve, reconnectionToken ? 1 : delay)
        )

        if (reconnectionToken) {
          reconnectionToken = undefined
          localStorage.removeItem(
            `${initData.user.id}_lastGameReconnectionToken`
          )
        }
      }
    }

    return null
  }

  const connectToGame = async (): Promise<Room> => {
    const connect = await tryConnect()

    if (connect === null) throw Error("connection error")

    const updateState = (state: MyState) => {
      const gameState = state.toJSON() as unknown as Game

      serialize(state, gameState)

      setGame(gameState)
    }

    connect.onStateChange((state) => updateState(state))
    connect.state.listen("status", () => getUser(initDataRaw))

    connect.onLeave(async (code) => {
      if (code === 4003) return

      if (code !== 4000) await connectToGame()
    })

    return connect
  }

  return await connectToGame()
}

import { Room } from "colyseus.js"
import { MyState } from "common"
import { client } from "@services/colyseus"
import { serialize } from "@utils/serialize"
import { Game } from "@contexts/Game"
import { InitData } from "@twa.js/sdk-react"
import { Dispatch, SetStateAction } from "react"
import { getUser } from "@utils/getUser"

export const establishConnect = async (
  initData: InitData | null,
  gameId: string | null,
  privateGame: boolean,
  doCreate: boolean,
  setGame: Dispatch<SetStateAction<Game>>
): Promise<Room> => {
  if (initData === null || initData.user === null) throw Error("no initData")

  const player = {
    id: initData.user.id,
    name: initData.user.firstName,
    language: initData.user.languageCode
  }
  const params = {
    player,
    id: gameId,
    privateGame
  }

  const maxAttempts = 30
  const delay = 1000

  const tryConnect = async (): Promise<Room<MyState> | null> => {
    let attempts = 0

    let reconnectionToken = localStorage.getItem("lastGameReconnectionToken")

    while (attempts < maxAttempts) {
      try {
        if (reconnectionToken) return await client.reconnect(reconnectionToken)
        else if (gameId === null) {
          return doCreate
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

        if (reconnectionToken) {
          reconnectionToken = undefined
          localStorage.removeItem("lastGameReconnectionToken")
        }

        await new Promise((resolve) => setTimeout(resolve, delay))
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
      console.log(gameState, "onStateChange")
    }

    connect.onStateChange((state) => updateState(state))
    connect.state.listen("status", () =>
      getUser(player.id).then((user) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(`${user.id}_balance`, `${user.balance}`)
          localStorage.setItem(
            `${user.id}_specialBalance`,
            `${user.specialBalance}`
          )
        }
      })
    )

    connect.onError((code, message) => {
      console.log(code, message, "onError")
    })
    connect.onLeave(async (code) => {
      console.log(code, "onLeave")

      if (code !== 4000) await connectToGame()
    })

    updateState(connect.state)

    return connect
  }

  return await connectToGame()
}

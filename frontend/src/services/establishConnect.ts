import { Room } from "colyseus.js"
import { MyState } from "common"
import { client } from "@services/colyseus"
import { serialize } from "@utils/serialize"
import onMessage from "@events/onMessage"
import { Game } from "@contexts/Game"
import { InitData } from "@twa.js/sdk-react"
import { Dispatch, SetStateAction } from "react"

export const establishConnect = async (
  initData: InitData | null,
  gameId: string | null,
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
    id: gameId
  }

  const maxAttempts = 15
  const delay = 1000

  const tryConnect = async (): Promise<Room<MyState> | null> => {
    let attempts = 0

    while (attempts < maxAttempts) {
      try {
        if (gameId === null) {
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

    connect.onMessage("game", onMessage)
    connect.onStateChange((state) => updateState(state))
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

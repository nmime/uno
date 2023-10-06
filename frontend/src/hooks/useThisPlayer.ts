import { GameContext } from "@contexts/Game"
import { useInitData } from "@tma.js/sdk-react"
import { PlayerDataClass } from "common"
import { useContext, useEffect, useState } from "react"

const useThisPlayer = () => {
  const initData = useInitData()
  const { game } = useContext(GameContext)

  const [thisPlayer, setThisPlayer] = useState<PlayerDataClass>(
    {} as PlayerDataClass
  )

  useEffect(() => {
    if (game.players && initData.user) {
      setThisPlayer(
        game.players.get(String(initData.user.id)) ||
          ({
            info: game.visitors.get(String(initData.user.id)),
            playerState: null
          } as PlayerDataClass)
      )
    }
  }, [game])

  return thisPlayer
}

export default useThisPlayer

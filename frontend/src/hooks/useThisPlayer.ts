import { GameContext } from "@contexts/Game"
import { useInitData } from "@tma.js/sdk-react"
import { PlayerDataClass } from "common"
import { useContext, useEffect, useState } from "react"

const useThisPlayer = () => {
  const initData = useInitData()
  const { game } = useContext(GameContext)

  const [thisPlayer, setThisPlayer] = useState<PlayerDataClass | null>(null)

  useEffect(() => {
    if (game.players && initData.user && initData.user.id != null) {
      const player =
        game.players.get(String(initData.user.id)) ||
        ({
          info: game.visitors.get(String(initData.user.id)),
          playerState: null
        } as PlayerDataClass)

      setThisPlayer(player)
    }
  }, [game.players, initData.user])

  return thisPlayer
}

export default useThisPlayer

import { GameContext } from "@contexts/Game"
import { PlayerProps } from "@players/Player"
import Image from "next/image"
import { useContext } from "react"

interface InformationProps {
  playerProps: PlayerProps
}

export function Information({
  playerProps: { player, position, thisPlayer }
}: InformationProps) {
  const { game } = useContext(GameContext)

  return (
    <>
      {typeof player.cardsCount !== "undefined" &&
      typeof thisPlayer.cardsCount !== "undefined" ? (
        <div
          style={{
            [position.top ? "left" : "bottom"]: 0,
            transform: `translate${position.top ? "X(-70%)" : "Y(50%)"}`
          }}
          className="absolute flex text-[--text-color]"
        >
          <Image src="/assets/card.svg" alt="" width={18} height={18} />
          <span>{player.cardsCount}</span>
        </div>
      ) : null}
      {player.winAmount &&
      game.status !== "playing" &&
      typeof thisPlayer.winAmount !== "undefined" ? (
        <div
          style={{
            [position.top ? "right" : "top"]: 0,
            transform: `translate${position.top ? "X(80%)" : "Y(-50%)"}`
          }}
          className="absolute flex text-[--text-color]"
        >
          <span className="pr-1">{player.winAmount}</span>
          <Image src="/assets/coin.svg" alt="" width={18} height={18} />
        </div>
      ) : null}
    </>
  )
}

import { PlayerProps } from "@players/Player"
import { PlayerDataClass } from "common"
import Image from "next/image"

interface InformationProps {
  player: PlayerDataClass
  position: PlayerProps["position"]
}

export function Information({ player, position }: InformationProps) {
  return (
    <>
      {typeof player.cardsCount !== "undefined" ? (
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
      {player.winAmount ? (
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

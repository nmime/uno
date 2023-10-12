import { PlayerDataClass } from "common"
import Image from "next/image"

interface InformationProps {
  player: PlayerDataClass
}

export function Information({ player }: InformationProps) {
  return (
    <>
      {player.cardsCount && (
        <div className="absolute left-0 flex -translate-x-2/3 text-[--text-color]">
          <Image src="/assets/card.svg" alt="" width={18} height={18} />
          <span>{player.cardsCount}</span>
        </div>
      )}
      {player.winAmount && (
        <div className="absolute right-0 flex translate-x-2/3 text-[--text-color]">
          <span className="pr-1">{player.winAmount}</span>
          <Image src="/assets/coin.svg" alt="" width={18} height={18} />
        </div>
      )}
    </>
  )
}

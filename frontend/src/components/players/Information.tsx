import { DimensionContext } from "@contexts/Dimension"
import { PlayerDataClass } from "common"
import Image from "next/image"
import { useContext } from "react"

interface InformationProps {
  player: PlayerDataClass
}

export function Information({ player }: InformationProps) {
  const { playerSize } = useContext(DimensionContext)

  return (
    <div className="">
      <div className="" style={{ maxWidth: `${playerSize * 1.1}px` }}>
        {player.info.name}
      </div>
      {player.cardsCount && (
        <div className="">
          <Image src="/assets/card.svg" alt="" width={18} height={18} />
          <span>{player.cardsCount}</span>
        </div>
      )}
      {player.winAmount && (
        <div className="">
          {player.winAmount}
          <Image src="/assets/coin.svg" alt="" width={18} height={18} />
        </div>
      )}
    </div>
  )
}

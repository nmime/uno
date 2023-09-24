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
    <>
      <div
        style={{ maxWidth: `${playerSize * 1.1}` }}
        className="absolute left-0 top-[8px] z-[1] flex items-center overflow-hidden text-ellipsis whitespace-nowrap font-semibold"
      >
        {player.info.name}
      </div>
      {player.cardsCount ? (
        <div className="absolute bottom-0 left-0 z-[1] flex items-center font-semibold">
          <Image
            src={`/assets/card.svg`}
            alt=""
            width="18"
            height="18"
            className="mr-1 inline-block"
          />
          {player.cardsCount}
        </div>
      ) : null}
      {player.winAmount ? (
        <div className="absolute bottom-0 right-0 z-[1] flex items-center font-semibold">
          {player.winAmount}
          <Image
            src={`/assets/coin.svg`}
            alt=""
            width="18"
            height="18"
            className="ml-1 inline-block"
          />
        </div>
      ) : null}
    </>
  )
}

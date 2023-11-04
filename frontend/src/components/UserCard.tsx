import { TextWithCoin } from "@components/TextWithCoin"
import { roundNumber } from "common/utils/roundNumber"
import Image from "next/image"
import React from "react"

export interface UserCardProps {
  id: number
  name: string
  balance: number
  statistics: {
    win: number
    lose: number
  }
}

export const UserCard = ({ balance, id, name, statistics }: UserCardProps) => {
  return (
    <tr className="hover:bg-[--secondary-background-color-light]">
      <th className="flex items-center px-2 py-1.5 font-normal">
        <div className="asp relative h-10 pr-2">
          <Image
            unoptimized={true}
            className="h-full w-full rounded-full object-cover object-center"
            width={128}
            height={128}
            src={`https://unogame.site/images/${id}.jpg`}
            alt=""
          />
        </div>
        <div className="text-xs">
          <div className="font-medium">{name}</div>
        </div>
      </th>
      <td className="pr-2">
        <TextWithCoin text={`${roundNumber(balance)}`} width={22} height={22} />
      </td>
      <td className="">{statistics.win}</td>
      <td className="">{statistics.lose}</td>
    </tr>
  )
}

import { TextWithCoin } from "@components/TextWithCoin"
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
      <th className="flex items-center gap-2 px-2 py-1 font-normal sm:gap-3 sm:px-4 sm:py-3">
        <div className="relative h-8 w-8 sm:h-10 sm:w-10">
          <Image
            unoptimized={true}
            className="h-full w-full rounded-full object-cover object-center"
            width={128}
            height={128}
            src={`https://unogame.site/images/${id}.jpg`}
            alt=""
          />
        </div>
        <div className="text-xs sm:text-sm">
          <div className="font-medium">{name}</div>
        </div>
      </th>
      <td className="px-2 py-1 sm:px-4 sm:py-3">
        <TextWithCoin text={`${balance}`} width={22} height={22} />
      </td>
      <td className="px-2 py-1 sm:px-3 sm:py-3">{statistics.win}</td>
      <td className="px-2 py-1 sm:px-3 sm:py-3">{statistics.lose}</td>
    </tr>
  )
}

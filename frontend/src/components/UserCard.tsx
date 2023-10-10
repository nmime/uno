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

export const UserCard = ({ id, name, balance, statistics }: UserCardProps) => {
  return (
    <tr className="hover:bg-[--secondary-background-color-light]">
      <th className="flex items-center gap-3 px-4 py-3 font-normal">
        <div className="relative h-10 w-10">
          <Image
            unoptimized={true}
            className="h-full w-full rounded-full object-cover object-center"
            width={160}
            height={160}
            src={`https://unogame.site/images/${id}.jpg`}
            alt=""
          />
        </div>
        <div>
          <div className="font-medium">{name}</div>
        </div>
      </th>
      <td className="px-4 py-3">
        <TextWithCoin text={`${balance}`} width={24} height={24} />
      </td>
      <td className="px-3 py-3">{statistics.win}</td>
      <td className="px-3 py-3">{statistics.lose}</td>
    </tr>
  )
}

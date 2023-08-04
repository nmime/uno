import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { RoomAvailable } from "colyseus.js"
import { client } from "@services/colyseus"
import Image from "next/image"

export default function GamesList() {
  const t = useTranslations("ListPage")
  const { lang } = useParams()
  const router = useRouter()

  const [rooms, setRooms] = useState<RoomAvailable[]>([])

  useEffect(() => {
    const intervalFn = async () =>
      setRooms(await client.getAvailableRooms("game"))

    const interval = setInterval(intervalFn, 2000)

    intervalFn()

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-3">
      <div className="flex items-center justify-center overflow-hidden rounded-lg shadow-md">
        <table className="w-full border-collapse bg-[--secondary-background-color] text-left text-sm text-[--text-color]">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">
                {t("creator")}
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                {t("bet")}
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                {t("players")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {rooms
              .filter((room) => room.metadata.creatorId)
              .map((room) => (
                <tr
                  key={room.roomId}
                  className="cursor-pointer hover:bg-[--secondary-background-color-light]"
                  onClick={() =>
                    router.replace(
                      `/${lang}/game?=tgWebAppStartParam${room.roomId}`
                    )
                  }
                >
                  <th className="flex gap-3 px-6 py-4 font-normal">
                    <div className="relative h-12 w-12">
                      <Image
                        className="h-full w-full rounded-full object-cover object-center"
                        width={160}
                        height={160}
                        src={`https://unogame.site/images/${room.metadata.creatorId}.jpg`}
                        alt=""
                      />
                    </div>
                    <div className="inline-flex items-center text-sm font-medium">
                      {room.metadata.creatorName}
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold">
                      {room.metadata.bet} 🪙
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {room.metadata.playersCount}/{room.metadata.maxPlayers}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

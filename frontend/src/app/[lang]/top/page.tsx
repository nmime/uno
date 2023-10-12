"use client"

import { UserCard, UserCardProps } from "@components/UserCard"
import useBackButton from "@hooks/useBackButton"
import { useSDK } from "@tma.js/sdk-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function Top() {
  const t = useTranslations("Top")
  useBackButton("/profile")

  const [users, setUsers] = useState<UserCardProps[]>([])

  const {
    components: { initDataRaw }
  } = useSDK()
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/topOfUsers/balance`, {
      headers: {
        Authorization: `Bearer ${initDataRaw}`
      }
    }).then(async (data) => setUsers(await data.json()))
  }, [])

  return (
    <div className="overflow-auto p-3">
      <div className="overflow-hidden rounded-lg">
        <table className="w-full border-collapse bg-[--secondary-background-color] text-left text-sm text-[--text-color] sm:table">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-2 py-1 text-xs font-medium sm:px-5 sm:py-3 sm:text-sm"
              >
                {t("name")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-medium sm:text-base md:text-lg"
              >
                {t("balance")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-medium sm:text-base md:text-lg"
              >
                {t("win")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-medium sm:text-base md:text-lg"
              >
                {t("lose")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                balance={user.balance}
                statistics={user.statistics}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

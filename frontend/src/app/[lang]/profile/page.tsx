"use client"

import { useEffect, useState } from "react"
import { IUser } from "common/database"
import { getUser } from "@utils/getUser"
import { useInitData } from "@twa.js/sdk-react"
import { useTranslations } from "next-intl"

export default function Profile() {
  const t = useTranslations("Profile")
  const initData = useInitData()

  const [user, setUser] = useState({} as IUser)

  useEffect(() => {
    const fetchUser = async () => setUser(await getUser(initData!.user!.id))

    if (initData !== null && initData.user !== null) fetchUser()
  }, [initData])

  return (
    <div className="flex h-screen flex-col items-center justify-center text-[--text-color]">
      <div className="text-4xl font-bold">{user.name}</div>
      <div className="mt-4 text-xl">
        {t("balance")}: {user.balance} 🪙
      </div>
      <div className="mt-6 text-xl font-semibold">{t("statistics")}</div>
      <div className="mt-4 flex flex-col items-start space-y-4">
        <div className="flex items-center">
          <div>
            🎮 {t("quantity")}:{" "}
            {(user.statistics?.win || 0) + (user.statistics?.lose || 0)}
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            {t("won")}: {user.statistics?.win || 0}
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            {t("lost")}: {user.statistics?.lose || 0}
          </div>
        </div>
      </div>
    </div>
  )
}

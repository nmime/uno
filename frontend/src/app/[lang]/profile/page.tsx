"use client"

import { TextWithCoin } from "@components/TextWithCoin"
import { useBackButton, useInitData } from "@twa.js/sdk-react"
import { getUser } from "@utils/getUser"
import { IUser } from "common/database"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function Profile() {
  const t = useTranslations("Profile")

  const [user, setUser] = useState({} as IUser)

  const initData = useInitData()

  useEffect(() => {
    const fetchUser = async () => setUser(await getUser(initData!.user!.id))

    if (initData !== null && initData.user !== null) fetchUser()
  }, [initData])

  const router = useRouter()
  const backButton = useBackButton()
  backButton.show()

  useEffect(() => {
    const back = () => router.replace("/")

    backButton.on("click", back)

    return () => backButton.off("click", back)
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center text-[--text-color]">
      <div className="text-4xl font-bold">{user.name}</div>
      <div className="mt-4 flex items-center text-xl">
        <TextWithCoin
          text={`${t("balance")}: ${user.balance || 0}`}
          width={30}
          height={30}
        />
      </div>
      <div className="mt-6 text-xl font-semibold">{t("statistics")}</div>
      <div className="mt-4 flex flex-col items-start space-y-4">
        <div className="flex items-center">
          <Image
            src={`/assets/gamepad.svg`}
            alt=""
            width="30"
            height="30"
            className="mr-2 inline-block"
          />
          <div>
            {t("quantity")}:{" "}
            {(user.statistics?.win || 0) + (user.statistics?.lose || 0)}
          </div>
        </div>
        <div className="flex items-center">
          <Image
            src={`/assets/trophy.svg`}
            alt=""
            width="30"
            height="30"
            className="mr-2 inline-block"
          />
          <div>
            {t("won")}: {user.statistics?.win || 0}
          </div>
        </div>
        <div className="flex items-center">
          <Image
            src={`/assets/confounded-face.svg`}
            alt=""
            width="30"
            height="30"
            className="mr-2 inline-block"
          />
          <div>
            {t("lost")}: {user.statistics?.lose || 0}
          </div>
        </div>
      </div>
    </div>
  )
}

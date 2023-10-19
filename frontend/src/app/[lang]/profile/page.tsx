"use client"

import { TextWithCoin } from "@components/TextWithCoin"
import useBackButton from "@hooks/useBackButton"
import { useInitData, useSDK } from "@tma.js/sdk-react"
import { getUser } from "@utils/getUser"
import { IUser } from "common/database"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"

export default function Profile() {
  const t = useTranslations("Profile")
  const router = useRouter()
  const { lang } = useParams()

  const [user, setUser] = useState({} as IUser)

  const initData = useInitData()
  const {
    components: { initDataRaw }
  } = useSDK()
  useEffect(() => {
    const fetchUser = async () =>
      setUser(await getUser(initDataRaw, initData!.user!.id))

    if (initData !== null && initData.user !== null) fetchUser()
  }, [initData])

  useBackButton()

  return (
    <div className="flex h-screen flex-col items-center justify-center text-[--text-color]">
      <div className="text-4xl font-bold text-[--text-color-light]">
        {initData.user.firstName || user.name}
      </div>
      <div className="mt-6 rounded-lg bg-[--secondary-background-color] p-3">
        <div className="flex items-center text-xl">
          <TextWithCoin
            text={`${t("balance")}: ${
              user.balance ??
              (Number(localStorage.getItem(`${initData.user.id}_balance`)) || 0)
            }`}
            width={28}
            height={28}
          />
        </div>
        <div
          className="mt-3 flex cursor-pointer items-center justify-center"
          onClick={() => router.replace(`/${lang}/deposit`)}
        >
          <div className="text-2xl font-bold">{t("deposit")}</div>
          <Image
            src={`/assets/plus.svg`}
            alt=""
            width={28}
            height={28}
            className="ml-2 inline-block"
          />
        </div>
        <div
          className="mt-2 flex cursor-pointer items-center justify-center"
          onClick={() => router.replace(`/${lang}/ad`)}
        >
          <div className="text-xl font-bold">{t("ad")}</div>
          <Image
            src={`/assets/ad.svg`}
            alt=""
            width={24}
            height={24}
            className="ml-2 inline-block"
          />
        </div>
      </div>
      <div className="mt-6 rounded-lg bg-[--secondary-background-color] p-3">
        <div className="flex justify-center text-xl font-medium">
          {t("statistics")}
        </div>
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
              {(user.statistics?.win ??
                (Number(localStorage.getItem(`${initData.user.id}_win`)) ||
                  0)) +
                (user.statistics?.lose ??
                  (Number(localStorage.getItem(`${initData.user.id}_lose`)) ||
                    0))}
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
              {t("won")}:{" "}
              {user.statistics?.win ??
                (Number(localStorage.getItem(`${initData.user.id}_win`)) || 0)}
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
              {t("lost")}:{" "}
              {user.statistics?.lose ??
                (Number(localStorage.getItem(`${initData.user.id}_lose`)) || 0)}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="rounded-full bg-[--button-color] px-4 py-2 text-center text-base font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed"
              onClick={() => router.replace(`/${lang}/top`)}
            >
              {t("top")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

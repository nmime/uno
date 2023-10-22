"use client"

import { TextWithCoin } from "@components/TextWithCoin"
import { useBackButton, useSDK, useThemeParams } from "@tma.js/sdk-react"
import { AdInfo } from "common/typings/yandex"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"

export default function Ad() {
  const t = useTranslations("Ad")

  const {
    components: { initDataRaw }
  } = useSDK()

  const router = useRouter()
  const backButton = useBackButton()
  backButton.show()

  useEffect(() => {
    const back = () => {
      if (status !== "watching") router.replace("/profile")
    }

    backButton.on("click", back)

    return () => backButton.off("click", back)
  }, [])

  const [status, setStatus] = useState("waiting")
  const [money, setMoney] = useState(0)
  const [adContent, setAdContent] = useState({} as AdInfo)

  const handleClose = () => console.log("handleClose")
  const handleError = (error: any) => {
    console.log("handleError", error)

    setStatus("error")
  }
  const handleRender = (data: AdInfo) => {
    console.log("handleRender", data)

    setAdContent(data)
    setStatus("watching")
  }
  const handleReward = (data: boolean) => {
    console.log("handleReward", data)

    if (data)
      fetch(`${process.env.NEXT_PUBLIC_BACKEND}/receiveReward`, {
        body: JSON.stringify(adContent),
        headers: {
          Authorization: `Bearer ${initDataRaw}`
        },
        method: "POST"
      }).then(async (data) => {
        setMoney(Number(await data.text()))

        setStatus("success")
      })
  }

  useEffect(() => {
    // @ts-ignore
    window.yaContextCb.push(() => {
      // @ts-ignore
      window.Ya.Context.AdvManager.render({
        blockId: "R-A-3382823-1",
        darkTheme: theme.isDark,
        onClose: handleClose,
        onError: handleError,
        onRender: handleRender,
        onRewarded: handleReward,
        type: "fullscreen"
      })
    })
  }, [])

  const theme = useThemeParams()

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center	text-[--text-color]">
      <div className="relative flex max-w-[250px] flex-col items-center rounded-lg bg-[--secondary-background-color] shadow">
        <div className="p-5 text-center">
          <h3 className="text-xl font-medium text-[--text-color]">
            {status === "success" ? (
              <TextWithCoin
                text={t("success", { money: money })}
                width={20}
                height={20}
              />
            ) : (
              t(status)
            )}
          </h3>
        </div>
      </div>
    </div>
  )
}

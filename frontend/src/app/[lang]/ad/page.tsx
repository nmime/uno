"use client"

import useBackButton from "@hooks/useBackButton"
import Script from "next/script"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function Ad() {
  const t = useTranslations("Ad")
  useBackButton("profile")

  const [message, setMessage] = useState(t("waiting"))
  const [timer, setTimer] = useState(null)

  const handleClose = () => {
    console.log("handleClose")
  }
  const handleError = (data) => {
    console.log("handleError", data)
  }
  const handleRender = (data) => {}

  useEffect(() => {}, [])

  return (
    <>
      <Script
        src="https://yandex.ru/ads/system/context.js"
        onReady={() => {
          // @ts-ignore
          window.yaContextCb.push(() => {
            // @ts-ignore
            window.Ya.Context.AdvManager.render({
              blockId: "R-A-3382823-1",
              onClose: handleClose,
              onError: handleError,
              onRender: handleRender,
              platform: "touch",
              type: "fullscreen"
            })
          })
        }}
      />
      <div>{message}</div>
    </>
  )
}

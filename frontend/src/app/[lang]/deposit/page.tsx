"use client"

import { TextWithCoin } from "@components/TextWithCoin"
import useBackButton from "@hooks/useBackButton"
import { useInitData, useSDK, useWebApp } from "@tma.js/sdk-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function Deposit() {
  const t = useTranslations("Deposit")
  useBackButton("/profile")

  const router = useRouter()

  const {
    components: { initDataRaw }
  } = useSDK()
  const initData = useInitData()
  const webApp = useWebApp()

  const [value, setValue] = useState("100")

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center	text-[--text-color]">
      <div className="relative flex max-w-[250px] flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
        <div className="p-5 pb-2 text-center">
          <span className="text-lg font-medium">{t("enter")}</span>
        </div>
        <div
          className="flex items-center justify-center"
          data-te-input-wrapper-init=""
        >
          <input
            type="number"
            className="min-h-[auto] w-[37%] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] text-[--text-color] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
            id="inputBet"
            step="10"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
          <div className="-ml-10 pr-2">
            <TextWithCoin text="" width={18} height={18} />
          </div>
          <div className="pl-3">= {(Number(value) / 100) * 2} $</div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="flex items-center rounded-full bg-[--button-color] px-5 py-2.5 text-center text-xl font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed"
            onClick={() =>
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND}/createOrder?amount=${value}&currency=USD&userId=${initData.user.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${initDataRaw}`
                  }
                }
              ).then(async (data) =>
                router.push((await data.json())!.data!.directPayLink)
              )
            }
          >
            <Image
              src={`/assets/@wallet.svg`}
              alt=""
              width={30}
              height={30}
              className="mr-2 inline-block"
            />
            {t("ok")}
          </button>
        </div>
      </div>
      <div
        className="cursor-pointer p-2"
        onClick={() =>
          webApp.openLink(
            encodeURI(
              `${process.env.NEXT_PUBLIC_BACKEND.replace(
                "backend.",
                ""
              )}/assets/${t("userAgreement")} UNO.pdf`
            )
          )
        }
      >
        {t("userAgreement")}
      </div>
    </div>
  )
}

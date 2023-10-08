"use client"

import { TextWithCoin } from "@components/TextWithCoin"
import useBackButton from "@hooks/useBackButton"
import { useInitData, useSDK } from "@tma.js/sdk-react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function Deposit() {
  const t = useTranslations("Deposit")
  const router = useRouter()

  const {
    components: { initDataRaw }
  } = useSDK()
  const initData = useInitData()

  useBackButton()

  const [value, setValue] = useState("100")

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center	text-[--text-color]">
      <div className="relative flex max-w-[250px] flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
        <div className="p-5 pb-2 text-center">
          <span className="text-lg font-medium">{t("enter")}</span>
        </div>
        <div
          className="relative mb-2 flex items-center justify-center"
          data-te-input-wrapper-init=""
        >
          <input
            type="number"
            className="peer-focus:text-primary dark:peer-focus:text-primary peer min-h-[auto] w-[37%] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="inputBet"
            step="100"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
          <div className="flex-row pr-2">
            <TextWithCoin text={""} width={18} height={18} />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="rounded-full bg-[--button-color] px-5 py-2.5 text-center text-xl font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed"
            onClick={() =>
              axios
                .get(
                  `${process.env.NEXT_PUBLIC_BACKEND}/createOrder?amount=${
                    Number(value) * 0.001
                  }&currency=USD&userId=${initData.user.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${initDataRaw}`
                    }
                  }
                )
                .then((data) => router.push(data.data.data.directPayLink))
            }
          >
            {t("ok")}
          </button>
        </div>
      </div>
      <div className="p-2">
        <Link href="/assets/Пользовательское соглашение UNO.pdf">
          {t("userAgreement")}
        </Link>
      </div>
    </div>
  )
}

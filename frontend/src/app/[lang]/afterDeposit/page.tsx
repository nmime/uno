"use client"

import Loading from "@components/Loading"
import useBackButton from "@hooks/useBackButton"
import { useSDK } from "@tma.js/sdk-react"
import axios from "axios"
import { IDeposit } from "common/database/deposit"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"

export default function AfterDeposit() {
  const t = useTranslations("AfterDeposit")
  useBackButton()

  const {
    components: { initDataRaw }
  } = useSDK()
  const searchParams = useSearchParams()

  const [id, status] = searchParams.get(`tgWebAppStartParam`).split("_")

  const [depositData, setDepositData] = useState({} as IDeposit)

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/receiveOrder/${id}`, {
        headers: {
          Authorization: `Bearer ${initDataRaw}`
        }
      })
      .then((data) => setDepositData(data.data as IDeposit))
  }, [])

  if (!depositData) return <Loading />

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center	text-[--text-color]">
      <div className="relative flex max-w-[250px] flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
        <div className="p-5 pb-2 text-center">
          <h3 className="text-xl font-medium text-[--text-color]">
            {t(status)}
          </h3>
          <p className="pt-2 text-xl text-[--text-color-dark] text-gray-500 ">
            {t("text", { money: depositData.amount })}
          </p>
        </div>
      </div>
    </div>
  )
}

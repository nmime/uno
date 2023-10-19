"use client"

import Loading from "@components/Loading"
import { TMALoader } from "@contexts/Loader"
import { SDKProvider, useSDK } from "@tma.js/sdk-react"
import { redirect } from "next/navigation"
import { FC, PropsWithChildren, ReactNode } from "react"

function DisplayGate({ children }: PropsWithChildren) {
  const { components, didInit, error } = useSDK()

  if (!didInit) return <Loading />

  if (error !== null) {
    console.error("Error while loading TMA switching to landing page", error)

    return redirect(`https://landing.unogame.site`)
  }

  if (components === null) return <Loading />

  return <>{children}</>
}

export const TMAProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <SDKProvider initOptions={{ debug: true }}>
      <DisplayGate>
        <TMALoader>{children}</TMALoader>
      </DisplayGate>
    </SDKProvider>
  )
}

"use client"

import { FC, PropsWithChildren, ReactNode } from "react"
import { SDKProvider } from "@twa.js/sdk-react"
import { TwaLoader } from "./Loader"

export const Twa = ({ children }: PropsWithChildren) => {
  return <TwaLoader>{children}</TwaLoader>
}

export const TWAProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <SDKProvider initOptions={{ debug: true }}>
      <Twa>{children}</Twa>
    </SDKProvider>
  )
}

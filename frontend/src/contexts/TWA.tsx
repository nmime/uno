"use client"

import {FC, PropsWithChildren, ReactNode} from "react"
import {SDKProvider} from "@twa.js/sdk-react"

import {TwaFrame} from "./Frame"
import {TwaLoader} from "./Loader"

export const Twa = ({children}: PropsWithChildren) => {
  return (
    <TwaLoader>
      <TwaFrame>{children}</TwaFrame>
    </TwaLoader>
  )
}

export const TWAProvider: FC<{
  children?: ReactNode
}> = ({children}) => {
  return (
    <SDKProvider initOptions={{debug: true}}>
      <Twa>{children}</Twa>
    </SDKProvider>
  )
}

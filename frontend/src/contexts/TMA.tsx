"use client"

import Loading from "@components/Loading"
import { TMALoader } from "@contexts/Loader"
import { SDKProvider, useSDK } from "@tma.js/sdk-react"
import { FC, PropsWithChildren, ReactNode, useMemo } from "react"

function DisplayGate({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK()

  const errorMessage = useMemo<null | string>(() => {
    if (!error) return null

    return error instanceof Error ? error.message : "Unknown error"
  }, [error])

  if (!didInit) return <Loading />

  if (error !== null)
    return (
      <>
        <p>
          SDK was unable to initialize. Probably, current application is being
          used not in Telegram Web Apps environment.
        </p>
        <blockquote>
          <p>{errorMessage}</p>
        </blockquote>
      </>
    )

  if (components === null) return <Loading />

  return <>{children}</>
}

export const TMAProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <SDKProvider initOptions={{ debug: true, acceptScrollbarStyle: true }}>
      <DisplayGate>
        <TMALoader>{children}</TMALoader>
      </DisplayGate>
    </SDKProvider>
  )
}

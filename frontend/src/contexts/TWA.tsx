"use client"

import { FC, PropsWithChildren, ReactNode, useMemo } from "react"
import { SDKProvider, useSDK } from "@twa.js/sdk-react"
import Loading from "@components/Loading"
import { TWALoader } from "@contexts/Loader"

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

export const TWAProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <SDKProvider initOptions={{ debug: true }}>
      <DisplayGate>
        <TWALoader>{children}</TWALoader>
      </DisplayGate>
    </SDKProvider>
  )
}

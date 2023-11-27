"use client"

import Loading from "@components/Loading"
import { TMALoader } from "@contexts/Loader"
import { SDKProvider, useSDKContext } from "@tma.js/sdk-react"
import { redirect } from "next/navigation"
import { PropsWithChildren, ReactNode } from "react"

export interface ContextProps {
  children: ReactNode
  headers: { [key: string]: string }
}

function DisplayGate({ children }: PropsWithChildren) {
  const { error, initResult, loading } = useSDKContext()

  if (!loading && !error && !initResult) return <Loading />

  if (error) {
    console.error("Error while initialization Mini App", error)

    return error.toString() ===
      "Error: Unable to retrieve any launch parameters."
      ? redirect(`https://landing.unogame.site`)
      : redirect("/")
  }

  if (loading) return <Loading />

  return <>{children}</>
}

export function TMAProvider({ children, headers }: ContextProps) {
  return (
    <SDKProvider options={{ async: true }}>
      <DisplayGate>
        <TMALoader headers={headers}>{children}</TMALoader>
      </DisplayGate>
    </SDKProvider>
  )
}

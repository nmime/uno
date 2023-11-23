"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div>{JSON.stringify(error)}</div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

"use client"

import { cardHeight, cardWidth } from "@table/Card"
import {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react"

type DimensionProps = {
  width: number
  height: number
  cardScale: number
  playerSize: number
}

export const DimensionContext: Context<DimensionProps> =
  createContext<DimensionProps>({} as DimensionProps)

export function DimensionProvider({ children }: PropsWithChildren) {
  const [dimensions, setDimensions] = useState<DimensionProps>({
    cardScale: 1,
    height: window.innerHeight,
    playerSize: 80,
    width: window.innerWidth
  })
  useEffect(() => {
    const handleResize = () => {
      let cardScale = (window.innerWidth / cardWidth) * 0.3
      if (window.innerHeight / cardHeight <= 1.8) cardScale -= 0.1

      setDimensions({
        cardScale,
        height: window.innerHeight,
        playerSize: window.innerWidth / 5.5,
        width: window.innerWidth
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <DimensionContext.Provider value={dimensions}>
      {children}
    </DimensionContext.Provider>
  )
}

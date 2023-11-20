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
  cardHeight: number
  cardWidth: number
  playerSize: number
}

export const DimensionContext: Context<DimensionProps> =
  createContext<DimensionProps>({} as DimensionProps)

export function DimensionProvider({ children }: PropsWithChildren) {
  const [dimensions, setDimensions] = useState<DimensionProps>({
    cardHeight,
    cardScale: 1,
    cardWidth,
    height: window.innerHeight,
    playerSize: 80,
    width: window.innerWidth
  })

  useEffect(() => {
    const handleResize = () => {
      const cardScale = window.innerHeight / 3.5 / cardHeight

      setDimensions({
        cardHeight: cardScale * cardHeight,
        cardScale,
        cardWidth: cardScale * cardWidth,
        height: window.innerHeight,
        playerSize: (cardHeight * cardScale) / 2.4,
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

"use client"

import {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react"
import { cardHeight, cardWidth } from "@table/Card"

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
    width: window.innerWidth,
    height: window.innerHeight,
    cardScale: 1,
    playerSize: 80
  })

  useEffect(() => {
    const handleResize = () => {
      let cardScale = (window.innerWidth / cardWidth) * 0.3
      if (window.innerHeight / cardHeight <= 1.8) cardScale -= 0.1

      setDimensions({
        cardScale,
        width: window.innerWidth,
        height: window.innerHeight,
        playerSize: window.innerWidth / 5.5
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <DimensionContext.Provider value={dimensions}>
      {children}
    </DimensionContext.Provider>
  )
}

import React from "react"
import type { CardDataClass } from "common"
import CardInFan from "@components/CardInFan"

export type CardFanProps = {
  cards: CardDataClass[]
}

export default function CardFan({ cards }: CardFanProps) {
  return (
    <div className="fixed">
      {cards.map((card, index) => {
        return (
          <CardInFan
            key={index}
            card={card}
            index={index}
            cardsCount={cards.length}
          />
        )
      })}
    </div>
  )
}

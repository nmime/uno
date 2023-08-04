import React, { useContext } from "react"
import type { CardDataClass } from "common"
import { MessageInit } from "common"
import CardInFan from "@components/CardInFan"
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core"
import { GameContext } from "@contexts/Game"

export type CardFanProps = {
  cards: CardDataClass[]
}

export default function CardFan({ cards }: CardFanProps) {
  const { room } = useContext(GameContext)

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      if (
        event.collisions &&
        event.collisions.length &&
        event.collisions[0].data?.value > 0.13
      )
        room.send("game", {
          type: "playerPutCard",
          card: event.active.data.current
        } as MessageInit)
    }
  })

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

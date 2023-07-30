import React from "react"
import type { CardDataClass } from "common"
import { useDraggable } from "@dnd-kit/core"
import Card, { finalCardWidth } from "@components/Card"

export type CardInFanProps = {
  card: CardDataClass
  index: number
  cardsCount: number
}

const countAngle = (angle: number, cardsCount: number, index: number) =>
  -angle / 2 + (angle / (cardsCount + 1)) * (index + 1)
const widthExtension = 0.2

export default function CardInFan({ card, index, cardsCount }: CardInFanProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${index}_${card.cardType}_${card.cardColor}`,
    data: card
  })

  const rotateAngle = countAngle(80, cardsCount, index)
  const width = window.innerWidth
  const halfOfCards = (cardsCount - 1) / 2
  const shift =
    widthExtension *
    (width / cardsCount) *
    (halfOfCards === index
      ? 0
      : halfOfCards > index
      ? halfOfCards - index
      : index - halfOfCards) *
    (halfOfCards === index ? 0 : halfOfCards > index ? -1 : 1)

  const defaultStyles = {
    top: "75%",
    left: width / 2 - finalCardWidth / 2 + shift,
    transformOrigin: "bottom",
    transform: `rotate(${rotateAngle}deg)`,
    touchAction: "none"
  }

  const style = transform
    ? {
        ...defaultStyles,
        zIndex: 1000,
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }
    : defaultStyles

  return (
    <div
      className="fixed"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={index}
    >
      <div>
        <Card card={card} />
      </div>
    </div>
  )
}

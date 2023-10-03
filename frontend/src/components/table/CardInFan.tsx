import { DimensionContext } from "@contexts/Dimension"
import { useDraggable } from "@dnd-kit/core"
import Card, { cardHeight, cardWidth } from "@table/Card"
import type { CardDataClass } from "common"
import React, { useContext } from "react"

export type CardInFanProps = {
  card: CardDataClass
  index: number
  cardsCount: number
  cardCanBeUsed: boolean
}

const countAngle = (angle: number, cardsCount: number, index: number) =>
  -angle / 2 + (angle / (cardsCount + 1)) * (index + 1)
const widthExtension = 0.2

export default function CardInFan({
  card,
  index,
  cardsCount,
  cardCanBeUsed
}: CardInFanProps) {
  const dimension = useContext(DimensionContext)

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
    top: dimension.height - cardHeight * dimension.cardScale * 0.8,
    left: width / 2 - (cardWidth * dimension.cardScale) / 2 + shift,
    transformOrigin: "bottom",
    transform: `rotate(${rotateAngle}deg)`,
    touchAction: "none"
  }

  const style = transform
    ? {
        ...defaultStyles,
        zIndex: 11,
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }
    : defaultStyles

  return (
    <div
      className={`fixed`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={index}
    >
      <div>
        <Card card={card} type="inFan" />
      </div>
    </div>
  )
}

import Card from "@components/Card"
import type { CardDataClass } from "common"
import { useDroppable } from "@dnd-kit/core"
import React from "react"
import Image from "next/image"

export type MainCardProps = {
  card: CardDataClass
  isCurrentMove: boolean
}

export default function MainCard({ card, isCurrentMove }: MainCardProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable"
  })
  const style = {}

  return (
    <div>
      <div
        style={{
          ...style,
          transform: "translate(-50%, -50%) scale(0.75)",
          borderRadius: "30px"
        }}
        className="fixed left-[60%] top-[40%]"
      >
        <Image
          src={`https://unogame.site/images/card_back.svg`}
          width={230}
          height={345}
          alt=""
        />
      </div>
      <div
        ref={setNodeRef}
        style={{
          ...style,
          transform: "translate(-50%, -50%)",
          boxShadow: isCurrentMove ? "0px 0px 10px 12px yellow" : "",
          backgroundColor: isCurrentMove ? "yellow" : "",
          borderRadius: "30px"
        }}
        className="fixed left-[45%] top-[48%]"
      >
        <Card card={card} scale={0.63} />
      </div>
    </div>
  )
}

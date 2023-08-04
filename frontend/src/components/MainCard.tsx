import Card from "@components/Card"
import type { CardDataClass } from "common"
import { MessageInit } from "common"
import { useDroppable } from "@dnd-kit/core"
import React, { useContext } from "react"
import Image from "next/image"
import { GameContext } from "@contexts/Game"

export type MainCardProps = {
  card: CardDataClass
  isCurrentMove: boolean
  playerCardsCanBeUsed: boolean
}

export default function MainCard({
  card,
  isCurrentMove,
  playerCardsCanBeUsed
}: MainCardProps) {
  const { room } = useContext(GameContext)

  const { setNodeRef } = useDroppable({
    id: "droppable"
  })
  const style = {}

  return (
    <div>
      <div
        style={{
          ...style,
          transform: "translate(-50%, -50%) scale(0.75)",
          borderRadius: "30px",
          boxShadow:
            playerCardsCanBeUsed && isCurrentMove
              ? "0px 0px 10px 10px yellow"
              : "",
          backgroundColor: playerCardsCanBeUsed && isCurrentMove ? "yellow" : ""
        }}
        className="fixed left-[60%] top-[40%]"
        onClick={() =>
          room.send("game", {
            type: "playerTakeCard"
          } as MessageInit)
        }
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

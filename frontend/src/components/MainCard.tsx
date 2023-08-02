import Card from "@components/Card"
import type { CardDataClass } from "common"
import { useDroppable } from "@dnd-kit/core"

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
    <div
      ref={setNodeRef}
      style={{
        ...style,
        transform: "translate(-50%, -50%)",
        boxShadow: isCurrentMove ? "0px 0px 10px 12px yellow" : "",
        borderRadius: "30px"
      }}
      className="fixed left-1/2 top-[42%]"
    >
      <Card card={card} />
    </div>
  )
}

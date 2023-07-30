import Card from "@components/Card"
import type { CardDataClass } from "common"
import { useDroppable } from "@dnd-kit/core"

export type MainCardProps = {
  card: CardDataClass
}
export default function MainCard({ card }: MainCardProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable"
  })
  const style = {}

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        transform: "translate(-50%, -50%)"
      }}
      className="fixed left-1/2 top-[42%]"
    >
      <Card card={card} />
    </div>
  )
}

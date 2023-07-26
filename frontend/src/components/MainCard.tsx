import Card from "@components/Card"
import type { CardDataClass } from "common"

type MainCardProps = {
  card: CardDataClass
}
export default function MainCard({ card }: MainCardProps) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <Card card={card} />
    </div>
  )
}

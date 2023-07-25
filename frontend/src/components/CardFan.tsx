import Card, { CardProps } from "@components/Card"

type CardFanProps = {
  images: CardProps[]
}
export default function CardFan({ images }: CardFanProps) {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center text-center">
      <div className="relative h-10 w-10">
        {images.map((card, index) => (
          <div key={index}>
            <Card cardColor={card.cardColor} cardType={card.cardType} />
          </div>
        ))}
      </div>
    </div>
  )
}

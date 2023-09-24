import Image from "next/image"

interface TextWithCoinProps {
  text: string
  width: number
  height: number
}

export function TextWithCoin({ text, width, height }: TextWithCoinProps) {
  return (
    <div className="flex items-center">
      {text}
      <Image
        src={`/assets/coin.svg`}
        alt=""
        width={width}
        height={height}
        className="ml-2 inline-block"
      />
    </div>
  )
}

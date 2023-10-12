import Image from "next/image"

interface TextWithCoinProps {
  text: string
  width: number
  height: number
  isHome?: boolean
}

export function TextWithCoin({
  height,
  isHome,
  text,
  width
}: TextWithCoinProps) {
  return (
    <div className="flex items-center">
      {isHome ? (
        <Image
          src={`/assets/home.svg`}
          alt=""
          width={width + 2}
          height={height + 2}
          className="mr-1 inline-block"
        />
      ) : null}
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

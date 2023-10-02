import Image from "next/image"

interface TextWithCoinProps {
  text: string
  width: number
  height: number
  isHome?: boolean
}

export function TextWithCoin({
  text,
  width,
  height,
  isHome
}: TextWithCoinProps) {
  return (
    <div className="flex items-center">
      {isHome ? (
        <Image
          src={`/assets/home.svg`}
          alt=""
          width={width}
          height={height}
          className="mr-2 inline-block"
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

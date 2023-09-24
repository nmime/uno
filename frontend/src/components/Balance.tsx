import { TextWithCoin } from "@components/TextWithCoin"
import { useInitData } from "@twa.js/sdk-react"

interface BalanceProps {
  bet: number
}

export function Balance({ bet }: BalanceProps) {
  const initData = useInitData()

  const balance =
    typeof window !== "undefined"
      ? Number(localStorage.getItem(`${initData!.user!.id}_balance`)) || 0
      : 0

  /*const specialBalance =
    typeof window !== "undefined"
      ? Number(localStorage.getItem(`${initData!.user!.id}_specialBalance`)) || 0
      : 0

  <div className="">{`${specialBalance}`}</div>*/
  return (
    <div className="absolute right-0 top-0 flex flex-col items-end text-base text-[--text-color]">
      <TextWithCoin text={`🏠 ${bet || 0}`} width={16} height={16} />
      <TextWithCoin text={`${balance}`} width={16} height={16} />
    </div>
  )
}

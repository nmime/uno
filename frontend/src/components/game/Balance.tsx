import { TextWithCoin } from "@components/TextWithCoin"
import { useInitData } from "@tma.js/sdk-react"
import { useEffect, useState } from "react"

interface BalanceProps {
  bet: number
}

export function Balance({ bet }: BalanceProps) {
  const initData = useInitData()

  const [balance, setBalance] = useState(
    Number(localStorage.getItem(`${initData.user.id}_balance`)) || 0
  )

  useEffect(() => {
    const updateBalance = () => {
      const newBalance =
        Number(localStorage.getItem(`${initData.user.id}_balance`)) || 0
      setBalance(newBalance)
    }

    window.addEventListener("storage", updateBalance)
    updateBalance()
    return () => {
      window.removeEventListener("storage", updateBalance)
    }
  }, [])

  return (
    <div className="absolute right-0 top-0 flex flex-col items-end pr-1 text-base text-[--text-color]">
      <TextWithCoin text={`${bet || 0}`} width={16} height={16} isHome />
      <TextWithCoin text={`${balance}`} width={16} height={16} />
    </div>
  )
}

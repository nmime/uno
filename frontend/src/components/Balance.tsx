import { useInitData } from "@twa.js/sdk-react"

export function Balance() {
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
      <div>{`${balance} 🪙`}</div>
    </div>
  )
}

import { maxPlayers as maxPlayersDefault } from "common"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useState } from "react"

interface CreateGameProps {
  setInput: Dispatch<SetStateAction<boolean>>
}

export function CreateGame({ setInput }: CreateGameProps) {
  const t = useTranslations("CreateGame")
  const { lang } = useParams()
  const router = useRouter()

  const [bet, setBet] = useState("20")
  const [minPlayers, setMinPlayers] = useState("2")
  const [maxPlayers, setMaxPlayers] = useState("10")

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative flex max-w-md flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
        <button
          type="button"
          className="absolute right-1.5 top-1.5 text-gray-500 hover:text-gray-700"
          onClick={() => setInput(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-5 pb-2 text-center">
          <h3 className="text-xl font-medium text-[--text-color]">
            {t("enter")}
          </h3>
        </div>
        <div
          className="flex flex-col items-center justify-center"
          data-te-input-wrapper-init=""
        >
          <span className="text-lg">{t("bet")}</span>
          <div className="flex items-center justify-center pb-3">
            <input
              type="number"
              className="w-[33%] border-none bg-transparent text-center"
              id="inputBet"
              step="10"
              min="10"
              value={bet}
              onChange={(e) => setBet(e.currentTarget.value)}
            />
            <div className="flex items-center">
              <Image
                src={`/assets/coin.svg`}
                alt=""
                width={18}
                height={18}
                className="ml-2 inline-block"
              />
            </div>
          </div>
          <span className="text-lg">{t("minPlayers")}</span>
          <div className="flex items-center justify-center">
            <input
              type="number"
              className="w-[33%] border-none bg-transparent text-center "
              id="inputMinPlayers"
              step="1"
              min="1"
              max={maxPlayersDefault}
              value={minPlayers}
              onChange={(e) => setMinPlayers(e.currentTarget.value)}
            />
            <div className="flex items-center">
              <Image
                src={`/assets/people.svg`}
                alt=""
                width={18}
                height={18}
                className="ml-2 inline-block"
              />
            </div>
          </div>
          <span className="text-lg">{t("maxPlayers")}</span>
          <div className="flex items-center justify-center">
            <input
              type="number"
              className="w-[33%] border-none bg-transparent text-center "
              id="inputMaxPlayers"
              step="1"
              min={minPlayers}
              max={maxPlayersDefault}
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.currentTarget.value)}
            />
            <div className="flex items-center">
              <Image
                src={`/assets/peoples.svg`}
                alt=""
                width={18}
                height={18}
                className="ml-2 inline-block"
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <button
            type="button"
            className="rounded-full bg-[--button-color] px-5 py-2.5 text-center text-xl font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed"
            onClick={() =>
              router.replace(
                `/${lang}/game?create=true&bet=${bet}&minPlayers=${minPlayers}&maxPlayers=${maxPlayers}`
              )
            }
          >
            {t("ok")}
          </button>
        </div>
      </div>
    </div>
  )
}

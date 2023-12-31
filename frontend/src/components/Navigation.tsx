import { CreateGame } from "@components/CreateGame"
import { DimensionContext } from "@contexts/Dimension"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useContext, useEffect, useState } from "react"

export default function Navigation() {
  const t = useTranslations()
  const { lang } = useParams()
  const router = useRouter()

  const [input, setInput] = useState(false)

  return (
    <div className="p-3">
      {input ? <CreateGame setInput={setInput} /> : ""}
      <div className="flex w-full justify-center rounded-lg bg-[--button-color] shadow-sm">
        <Button
          icon="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
          label={t("join")}
          onClick={() => router.replace(`/${lang}/game?join=true`)}
        />

        <Button
          icon="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
          label={t("create")}
          onClick={() => setInput(true)}
        />

        <Button
          icon="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
          label={t("profile")}
          onClick={() => router.replace(`/${lang}/profile`)}
        />
      </div>
    </div>
  )
}

interface ButtonProps {
  icon: string
  label: string
  onClick: () => void
}

const Button = ({ icon, label, onClick }: ButtonProps) => {
  const { width } = useContext(DimensionContext)

  const [showText, setShowText] = useState(true)
  useEffect(() => {
    setShowText(width > 360)
  }, [width])

  return (
    <button
      type="button"
      className="mx-1 inline-flex items-center overflow-hidden text-ellipsis rounded-lg px-1.5 py-3 text-sm font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-light] focus:outline-none"
      onClick={onClick}
    >
      <svg
        className="mr-2"
        viewBox="0 0 15 15"
        fill="currentColor"
        style={{
          height: showText ? "1rem" : "1.5rem",
          width: showText ? "1rem" : "1.5rem"
        }}
      >
        <path d={icon}></path>
      </svg>
      {showText && (
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  )
}

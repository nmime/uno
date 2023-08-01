import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"

export default function Navigation() {
  const t = useTranslations()
  const { lang } = useParams()
  const router = useRouter()

  return (
    <div
      className={`fixed bottom-0 left-0 m-2 flex w-full justify-center p-2 text-center`}
    >
      <div className="inline-flex -space-x-0 divide-x divide-[--button-text-color] overflow-hidden rounded-lg bg-[--button-color] text-[--button-text-color] shadow-sm">
        <button
          type="button"
          className="text-secondary-700 inline-flex items-center px-4 py-2.5 text-center text-sm font-medium shadow-sm hover:bg-[--button-color-light] focus:bg-[--button-color-dark]"
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"></path>
          </svg>
          {t("main")}
        </button>
        <button
          type="button"
          className="text-secondary-700 inline-flex items-center px-4 py-2.5 text-center text-sm font-medium shadow-sm hover:bg-[--button-color-light] focus:bg-[--button-color-dark]"
          onClick={() => router.replace(`/${lang}/game`)}
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            ></path>
          </svg>
          {t("create")}
        </button>
        <button
          type="button"
          className="text-secondary-700 inline-flex items-center px-4 py-2.5 text-center text-sm font-medium shadow-sm hover:bg-[--button-color-light] focus:bg-[--button-color-dark]"
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
              clipRule="evenodd"
            ></path>
          </svg>
          {t("wallet")}
        </button>
      </div>
    </div>
  )
}

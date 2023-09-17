import {
  ThemeParams,
  useBackButton,
  useClosingBehaviour,
  useInitData,
  useSDK,
  useThemeParams,
  useViewport,
  useWebApp
} from "@twa.js/sdk-react"
import { PropsWithChildren, useEffect } from "react"
import { convertKeysToCssVars } from "@utils/converKeysToCssVars"
import { lightenColor } from "@utils/lightenColor"
import { usePathname, useRouter } from "next/navigation"
import Loading from "@components/Loading"
import { getUser } from "@utils/getUser"

export function TwaIsReady({ children }: PropsWithChildren) {
  const router = useRouter()
  const pathname = usePathname()

  const webApp = useWebApp()

  useEffect(() => {
    webApp.ready()
  }, [webApp])

  const theme = useThemeParams()
  const changeTheme = (theme: ThemeParams) => {
    // @ts-ignore
    const themeCss = convertKeysToCssVars({
      backgroundColor: theme.backgroundColor,
      buttonColor: theme.buttonColor,
      buttonTextColor: theme.buttonTextColor,
      hintColor: theme.hintColor,
      isDark: String(theme.isDark),
      linkColor: theme.linkColor,
      secondaryBackgroundColor: theme.secondaryBackgroundColor,
      textColor: theme.textColor
    })

    if (theme.backgroundColor) webApp.setBackgroundColor(theme.backgroundColor)
    webApp.setHeaderColor("bg_color")

    for (const themeCssKey in themeCss) {
      document.documentElement.style.setProperty(
        themeCssKey,
        // @ts-ignore
        themeCss[themeCssKey]
      )

      document.documentElement.style.setProperty(
        themeCssKey + "-light",
        // @ts-ignore
        lightenColor(themeCss[themeCssKey], 20)
      )

      document.documentElement.style.setProperty(
        themeCssKey + "-dark",
        // @ts-ignore
        lightenColor(themeCss[themeCssKey], -20)
      )
    }
  }
  changeTheme(theme)
  theme.on("changed", () => changeTheme(theme))

  const backButton = useBackButton()
  if (pathname.endsWith("/")) backButton.hide()
  else backButton.show()
  backButton.on("click", () => router.replace("/"))

  const closingConfirmation = useClosingBehaviour()
  closingConfirmation.enableConfirmation()

  const viewport = useViewport()
  viewport.expand()

  const initData = useInitData()
  if (initData !== null && initData.user !== null)
    getUser(initData.user.id).then((user) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${user.id}_balance`, `${user.balance}`)
        localStorage.setItem(
          `${user.id}_specialBalance`,
          `${user.specialBalance}`
        )
      }
    })

  return <>{children}</>
}

export function TwaLoader({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK()

  if (!didInit) return <Loading />

  if (error) {
    console.error(error)

    return <div>Something went wrong: {(error as any)?.message}</div>
  }

  if (components === null) {
    return <div>Warming up SDK.</div>
  }

  return <TwaIsReady>{children}</TwaIsReady>
}

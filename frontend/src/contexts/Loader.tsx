import {
  ThemeParams,
  useBackButton,
  useClosingBehaviour,
  useInitData,
  usePopup,
  useThemeParams,
  useViewport,
  useWebApp
} from "@twa.js/sdk-react"
import { PropsWithChildren, useEffect } from "react"
import { convertKeysToCssVars } from "@utils/converKeysToCssVars"
import { lightenColor } from "@utils/lightenColor"
import { usePathname, useRouter } from "next/navigation"
import { getUser } from "@utils/getUser"
import { useTranslations } from "next-intl"

export function TWALoader({ children }: PropsWithChildren) {
  const t = useTranslations("Exit")

  const router = useRouter()
  const pathname = usePathname()

  const webApp = useWebApp()
  const popup = usePopup()

  useEffect(() => webApp.ready(), [])

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
  if (pathname.includes("game") || pathname.includes("profile"))
    backButton.show()
  else backButton.hide()
  backButton.on("click", () => {
    console.log(pathname, "click")

    if (pathname.includes("game")) {
      popup
        .open({
          message: t("message"),
          buttons: [
            {
              id: "yes",
              type: "destructive",
              text: t("yes")
            },
            {
              id: "no",
              type: "default",
              text: t("no")
            }
          ]
        })
        .then((event) => {
          if (event === "yes") {
            router.replace("/")

            localStorage.removeItem("lastGameReconnectionToken")
          }
        })
        .catch(() => {})
    } else if (pathname.includes("profile")) router.replace("/")
  })

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

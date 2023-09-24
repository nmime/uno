import {
  ThemeParams,
  useClosingBehaviour,
  useInitData,
  useThemeParams,
  useViewport,
  useWebApp
} from "@twa.js/sdk-react"
import { convertKeysToCssVars } from "@utils/converKeysToCssVars"
import { getUser } from "@utils/getUser"
import { lightenColor } from "@utils/lightenColor"
import { PropsWithChildren, useEffect } from "react"

export function TWALoader({ children }: PropsWithChildren) {
  const webApp = useWebApp()

  const closingConfirmation = useClosingBehaviour()
  closingConfirmation.enableConfirmation()

  const viewport = useViewport()
  viewport.expand()

  useEffect(() => webApp.ready(), [])

  const initData = useInitData()
  useEffect(() => {
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
  }, [])

  const theme = useThemeParams()
  useEffect(() => {
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

      if (theme.backgroundColor)
        webApp.setBackgroundColor(theme.backgroundColor)
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

    return () => theme.off("changed", () => changeTheme(theme))
  }, [])

  return <>{children}</>
}

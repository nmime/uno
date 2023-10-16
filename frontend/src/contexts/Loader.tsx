import type { ThemeParams } from "@tma.js/sdk"
import {
  useClosingBehaviour,
  useInitData,
  useSDK,
  useThemeParams,
  useViewport,
  useWebApp
} from "@tma.js/sdk-react"
import { convertKeysToCssVars } from "@utils/converKeysToCssVars"
import { getUser } from "@utils/getUser"
import { lightenColor } from "@utils/lightenColor"
import { PropsWithChildren, useEffect } from "react"

export function TMALoader({ children }: PropsWithChildren) {
  const webApp = useWebApp()

  const closingConfirmation = useClosingBehaviour()
  closingConfirmation.enableConfirmation()

  const viewport = useViewport()
  viewport.expand()

  const initData = useInitData()
  const {
    components: { initDataRaw }
  } = useSDK()
  useEffect(() => {
    if (initData !== null && initData.user !== null)
      getUser(initDataRaw, initData.user.id).then((user) => {
        if (typeof window !== "undefined")
          localStorage.setItem(`${user.id}_balance`, `${user.balance}`)
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
        if (!themeCss[themeCssKey]) continue

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
    const handleChangeTheme = () => changeTheme(theme)

    changeTheme(theme)
    theme.on("changed", handleChangeTheme)
    return () => theme.off("changed", handleChangeTheme)
  }, [])

  return <>{children}</>
}

import { ContextProps } from "@contexts/TMA"
import type { ThemeParams } from "@tma.js/sdk"
import {
  useClosingBehavior,
  useInitData,
  useMiniApp,
  useSDKContext,
  useThemeParams,
  useViewport
} from "@tma.js/sdk-react"
import { convertKeysToCssVars } from "@utils/converKeysToCssVars"
import { getUser } from "@utils/getUser"
import { lightenColor } from "@utils/lightenColor"
import { useEffect } from "react"

export function TMALoader({ children, headers }: ContextProps) {
  const miniApp = useMiniApp()

  const closingConfirmation = useClosingBehavior()
  closingConfirmation.enableConfirmation()

  const viewport = useViewport()
  viewport.expand()

  const initData = useInitData()
  const {
    initResult: { initDataRaw }
  } = useSDKContext()

  useEffect(() => {
    if (initData !== null && initData.user !== null)
      getUser(initDataRaw, headers)
  }, [])

  const theme = useThemeParams()
  useEffect(() => {
    const changeTheme = (theme: ThemeParams) => {
      // @ts-ignore
      const themeCss = convertKeysToCssVars({
        accentTextColor: theme.accentTextColor,
        backgroundColor: theme.backgroundColor,
        buttonColor: theme.buttonColor,
        buttonTextColor: theme.buttonTextColor,
        destructiveTextColor: theme.destructiveTextColor,
        hintColor: theme.hintColor,
        isDark: String(theme.isDark),
        linkColor: theme.linkColor,
        secondaryBackgroundColor: theme.secondaryBackgroundColor,
        sectionBackgroundColor: theme.sectionBackgroundColor,
        sectionHeaderTextColor: theme.sectionHeaderTextColor,
        subtitleTextColor: theme.subtitleTextColor,
        textColor: theme.textColor
      })

      if (theme.backgroundColor)
        miniApp.setBackgroundColor(theme.backgroundColor)
      if (theme.headerBackgroundColor)
        miniApp.setHeaderColor(theme.headerBackgroundColor)

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
    theme.on("change", handleChangeTheme)
    return () => theme.off("change", handleChangeTheme)
  }, [])

  return <>{children}</>
}

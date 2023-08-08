import {
  ThemeParams,
  useBackButton,
  useClosingBehaviour,
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
  if (pathname.includes("/game")) backButton.show()
  else backButton.hide()
  backButton.on("click", () => router.replace("/"))

  const closingConfirmation = useClosingBehaviour()
  closingConfirmation.enableConfirmation()

  const viewport = useViewport()
  viewport.expand()

  return <>{children}</>
}

export function TwaLoader({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK()

  if (!didInit) {
    return <Loading />
  }

  if (error) {
    console.error(error)
    console.log(window.location.hash.slice(1))

    return <div>Something went wrong: {(error as any)?.message}</div>
  }

  if (components === null) {
    return <div>Warming up SDK.</div>
  }

  return <TwaIsReady>{children}</TwaIsReady>
}

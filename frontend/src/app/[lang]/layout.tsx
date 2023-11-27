import { DimensionProvider } from "@contexts/Dimension"
import { ContextProps, TMAProvider } from "@contexts/TMA"
import { ToastProvider } from "@contexts/Toast"
import { languages } from "common/typings/languages"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import Script from "next/script"
import { NextIntlClientProvider } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  description: "UNO game in TMA",
  title: "UNO Game"
}

interface Props {
  children: ReactNode
  params: { lang: string }
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params: { lang }
}: Props) {
  unstable_setRequestLocale(lang)

  let locales
  try {
    locales = (await import(`common/locales/${lang}.json`)).default
  } catch (error) {}

  const headersForContext: ContextProps["headers"] = {}
  headers().forEach((value, key) => (headersForContext[key] = value))

  return (
    <html lang={lang}>
      <Script
        async
        src="https://yandex.ru/ads/system/context.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <head>
        <script>window.yaContextCb = window.yaContextCb || []</script>
      </head>
      <body
        className={inter.className}
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)"
        }}
      >
        <NextIntlClientProvider locale={lang} messages={locales}>
          <TMAProvider headers={headersForContext}>
            <DimensionProvider>
              <ToastProvider>
                <div className="container">{children}</div>
              </ToastProvider>
            </DimensionProvider>
          </TMAProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

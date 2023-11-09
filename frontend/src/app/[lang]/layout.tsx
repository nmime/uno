import "./globals.css"

import { DimensionProvider } from "@contexts/Dimension"
import { TMAProvider } from "@contexts/TMA"
import { ToastProvider } from "@contexts/ToastError"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { NextIntlClientProvider } from "next-intl"
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

export default async function RootLayout({
  children,
  params: { lang }
}: Props) {
  let locales
  try {
    locales = (await import(`common/locales/${lang}.json`)).default
  } catch (error) {}

  return (
    <html lang={lang}>
      <head>
        <Script
          async
          src="https://yandex.ru/ads/system/context.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <script>window.yaContextCb = window.yaContextCb || []</script>
        <title>UNO Game</title>
      </head>
      <body
        className={inter.className}
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)"
        }}
      >
        <NextIntlClientProvider locale={lang} messages={locales}>
          <TMAProvider>
            <ToastProvider>
              <DimensionProvider>
                <div className="container">{children}</div>
              </DimensionProvider>
            </ToastProvider>
          </TMAProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

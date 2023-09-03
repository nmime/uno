import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GameProvider } from "@contexts/Game"
import { TWAProvider } from "@contexts/TWA"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"
import { DimensionProvider } from "@contexts/Dimension"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UNO Game",
  description: "UNO game in TWA"
}

export async function generateStaticParams() {
  return ["en", "ru"].map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  params: { lang: string }
}

export default async function RootLayout({
  children,
  params: { lang }
}: Props) {
  let locales
  try {
    locales = (await import(`@public/locales/${lang}.json`)).default
  } catch (error) {
    console.error(error)
  }

  return (
    <html lang={lang}>
      <body
        className={inter.className}
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <NextIntlClientProvider locale={lang} messages={locales}>
          <TWAProvider>
            <GameProvider>
              <DimensionProvider>
                <div className={"container"}>{children}</div>
              </DimensionProvider>
            </GameProvider>
          </TWAProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

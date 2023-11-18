import { DimensionProvider } from "@contexts/Dimension"
import { TMAProvider } from "@contexts/TMA"
import { ToastProvider } from "@contexts/ToastError"
import { languages } from "common/typings/languages"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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

  return (
    <html lang={lang}>
      <head>
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

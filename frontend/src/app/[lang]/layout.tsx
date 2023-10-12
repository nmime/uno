import "./globals.css"

import { DimensionProvider } from "@contexts/Dimension"
import { TMAProvider } from "@contexts/TMA"
import { ToastProvider } from "@contexts/ToastError"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  description: "UNO game in TWA",
  title: "UNO Game"
}

export async function generateStaticParams() {
  return ["en", "ru"].map((locale) => ({ locale }))
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
      <body
        className={inter.className}
        style={{ backgroundColor: "var(--background-color)" }}
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

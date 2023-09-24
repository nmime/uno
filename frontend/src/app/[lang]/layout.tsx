import "./globals.css"

import { DimensionProvider } from "@contexts/Dimension"
import { ToastProvider } from "@contexts/ToastError"
import { TWAProvider } from "@contexts/TWA"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UNO Game",
  description: "UNO game in TWA"
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
    locales = (await import(`@public/locales/${lang}.json`)).default
  } catch (error) {
    console.error(error)
  }

  console.log("RootLayout")

  return (
    <html lang={lang}>
      <body
        className={inter.className}
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <NextIntlClientProvider locale={lang} messages={locales}>
          <TWAProvider>
            <ToastProvider>
              <DimensionProvider>
                <div className={"container"}>{children}</div>
              </DimensionProvider>
            </ToastProvider>
          </TWAProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

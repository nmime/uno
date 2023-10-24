import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  defaultLocale: "ru",
  localeDetection: true,
  locales: ["en", "ru", "de", "es", "hn", "it", "pt", "tr", "uz", "zh"]
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|/favicon.ico|images|assets).*)"]
}

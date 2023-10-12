import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  defaultLocale: "ru",
  locales: ["en", "ru"]
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|/favicon.ico|images|assets).*)"]
}

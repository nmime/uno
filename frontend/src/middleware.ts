import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "ru"
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|/favicon.ico|images|assets).*)"]
}

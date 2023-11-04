import { languages } from "common/typings/languages"
import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  defaultLocale: "ru",
  localeDetection: true,
  locales: languages
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|/favicon.ico|images|assets).*)"]
}

import { defaultLocale } from "common/typings/languages"
import { redirect } from "next/navigation"

export default function RootPage() {
  redirect(`/${defaultLocale}`)
}

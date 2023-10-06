import { useBackButton as useBackButtonSdk, usePopup } from "@tma.js/sdk-react" // Assuming usePopup is from the same library
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

const useBackButton = () => {
  const backButton = useBackButtonSdk()
  const popup = usePopup()
  const router = useRouter()
  const t = useTranslations("Exit")

  useEffect(() => {
    const back = () =>
      popup
        .open({
          message: t("message"),
          buttons: [
            {
              id: "yes",
              type: "destructive",
              text: t("yes")
            },
            {
              id: "no",
              type: "default",
              text: t("no")
            }
          ]
        })
        .then((event) => {
          if (event === "yes") {
            router.replace("/")
          }
        })

    backButton.on("click", back)

    return () => backButton.off("click", back)
  }, [backButton, popup, router, t])

  return backButton
}

export default useBackButton

import { useBackButton, usePopup } from "@tma.js/sdk-react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

const useBackButtonGame = () => {
  const backButton = useBackButton()
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

    backButton.show()

    return () => backButton.off("click", back)
  }, [backButton])

  return backButton
}

export default useBackButtonGame

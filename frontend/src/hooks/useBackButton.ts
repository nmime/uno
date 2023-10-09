import { useBackButton as useBackButtonSdk } from "@tma.js/sdk-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const useBackButton = (path: string = "/") => {
  const router = useRouter()
  const backButton = useBackButtonSdk()
  backButton.show()

  useEffect(() => {
    const back = () => router.replace(path)

    backButton.on("click", back)

    return () => backButton.off("click", back)
  }, [])

  return backButton
}

export default useBackButton

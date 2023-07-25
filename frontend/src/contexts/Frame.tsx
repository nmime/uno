import {useWebApp} from "@twa.js/sdk-react"
import {FC, ReactNode} from "react"

export const TwaFrame: FC<{
  children?: ReactNode
}> = ({children}) => {
  const webApp = useWebApp()

  return <>{children}</>
}

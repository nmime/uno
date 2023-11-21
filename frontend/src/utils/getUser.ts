import { ContextProps } from "@contexts/TMA"
import { IUser } from "common/database"

export async function getUser(
  initDataRaw: string,
  headers?: ContextProps["headers"]
) {
  const user = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/userinfo`, {
    headers: {
      Authorization: `Bearer ${initDataRaw}`,
      "CF-IPCountry": headers["cf-ipcountry"]
    }
  })

  const userJson = (await user.json()) as IUser

  localStorage.setItem(`${userJson.id}_balance`, `${userJson.balance}`)
  localStorage.setItem(`${userJson.id}_win`, `${userJson.statistics.win}`)
  localStorage.setItem(`${userJson.id}_lose`, `${userJson.statistics.lose}`)

  window.dispatchEvent(new Event("storage"))

  return userJson
}

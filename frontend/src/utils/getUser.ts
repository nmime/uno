import { IUser } from "common/database"

export async function getUser(initDataRaw: string, id: number) {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/userinfo/${id}`,
    {
      headers: {
        Authorization: `Bearer ${initDataRaw}`
      }
    }
  )

  const userJson = (await user.json()) as IUser

  localStorage.setItem(`${userJson.id}_balance`, `${userJson.balance}`)
  localStorage.setItem(`${userJson.id}_win`, `${userJson.statistics.win}`)
  localStorage.setItem(`${userJson.id}_lose`, `${userJson.statistics.lose}`)

  return userJson
}

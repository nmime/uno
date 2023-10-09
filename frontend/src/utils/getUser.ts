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

  return (await user.json()) as IUser
}

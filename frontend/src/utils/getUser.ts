import axios from "axios"
import { IUser } from "common/database"

export async function getUser(initDataRaw: string, id: number) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/userinfo/${id}`,
    {
      headers: {
        Authorization: `Bearer ${initDataRaw}`
      }
    }
  )

  return user.data as IUser
}

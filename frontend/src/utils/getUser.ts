import axios from "axios"
import { IUser } from "common/database"

export async function getUser(id: number) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/userinfo/${id}`
  )

  return user.data as IUser
}

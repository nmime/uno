import { User } from "common/database"

export async function findUser(id: number, name?: string) {
  let user = await User.findOne({ id })
  if (!user)
    user = new User({
      id,
      name
    })

  return user
}

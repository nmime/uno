import { User } from "common/database"

export async function findUser(id: number, name?: string) {
  let user = await User.findOne({ id })
  if (!user)
    user = new User({
      from: "miniapp",
      id,
      name
    })

  await user.save()

  return user
}

import { User } from "common/database"

export async function findUser(id: number, name?: string, country?: string) {
  let user = await User.findOne({ id })
  if (!user)
    user = new User({
      from: "miniapp",
      id,
      name
    })

  user.country = country

  user.save().catch((error) => console.error("Failed to save user:", error))

  return user
}

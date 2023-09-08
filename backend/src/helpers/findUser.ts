import { User } from "common/database"

export async function findUser(id: number) {
  return User.findOne({ id })
}

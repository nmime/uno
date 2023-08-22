import { IUser, User } from "common/database"

export async function findUser(id: IUser["id"]) {
  return User.findOne({ id })
}

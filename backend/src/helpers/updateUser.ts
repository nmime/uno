import { IUser, User } from "common/database"
import { UpdateQuery } from "mongoose"

export async function updateUser(id: number, updateObject: UpdateQuery<IUser>) {
  if (!updateObject.$set) updateObject.$set = {}
  updateObject.$set.lastActivity = new Date()

  return User.updateOne({ id }, updateObject)
}

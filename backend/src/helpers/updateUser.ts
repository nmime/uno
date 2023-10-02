import { User } from "common/database"
import { UpdateQuery, UpdateWithAggregationPipeline } from "mongoose"

export async function updateUser(
  id: number,
  updateObject:
    | UpdateWithAggregationPipeline
    | UpdateQuery<
        { createdAt: NativeDate; updatedAt: NativeDate } & {
          balance?: number
        }
      >
) {
  return User.updateOne({ id }, updateObject)
}

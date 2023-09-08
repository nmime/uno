import { User } from "common/database"
import { UpdateQuery, UpdateWithAggregationPipeline } from "mongoose"

export async function updateUser(
  id: number,
  updateObject:
    | UpdateWithAggregationPipeline
    | UpdateQuery<
        { createdAt: NativeDate; updatedAt: NativeDate } & {
          id: number
          balance?: number
          lang?: string
          languageCode?: string
          name?: string
          specialBalance?: number
          username?: string
        }
      >
) {
  return User.updateOne({ id }, updateObject)
}

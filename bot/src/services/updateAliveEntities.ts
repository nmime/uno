import updateBotStat from "@services/updateBotStat"
import { Context } from "@typings/context"
import { Group, IGroup, IUser, User } from "common/database"
import { Bot, GrammyError } from "grammy"
import { Model } from "mongoose"

const shift = 5000

interface Result {
  id: number
  i: number
  result: boolean | string
}

export default async function updateAliveEntities(
  bot: Bot<Context>
): Promise<void> {
  await updateEntities<IUser>(User, updateUserStatus)
  await updateEntities<IGroup>(Group, updateGroupStatus)

  await updateBotStat()

  async function updateEntities<T extends IUser | IGroup>(
    EntityModel: Model<T>,
    updateStatus: (ids: number[], status: boolean) => Promise<void>
  ): Promise<void> {
    const promises: Promise<Result>[] = []

    let inactiveIds: number[] = []
    let activeIds: number[] = []

    const entitiesCount: number = await EntityModel.countDocuments()

    for (let y = 0; y <= Math.ceil(entitiesCount / shift); y++) {
      const entities = await EntityModel.find({}, "-_id id", {
        limit: shift,
        skip: y * shift
      })

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i] as IUser | IGroup

        const promise: Promise<Result> = bot.api
          .sendChatAction(entity.id, "typing")
          .then((): Result => ({ i, id: entity.id, result: true }))
          .catch(
            (e: GrammyError): Result => ({
              i,
              id: entity.id,
              result: e.description || e.message
            })
          )

        promises.push(promise)

        if (i !== 0 && i % 10 === 0) {
          const results: Result[] = await Promise.all(promises)
          handleResults(results)

          promises.length = 0
        }

        if (i % 500 === 0) {
          await updateStatus(inactiveIds, false)
          await updateStatus(activeIds, true)

          inactiveIds = []
          activeIds = []
        }
      }
    }

    function handleResults(results: Result[]): void {
      results.forEach((result) => {
        if (result.result === true) {
          activeIds.push(result.id)
        } else {
          inactiveIds.push(result.id)
        }
      })
    }
  }

  async function updateUserStatus(
    ids: number[],
    status: boolean
  ): Promise<void> {
    await User.updateMany({ id: { $in: ids } }, { alive: status })
  }

  async function updateGroupStatus(
    ids: number[],
    status: boolean
  ): Promise<void> {
    await Group.updateMany({ id: { $in: ids } }, { alive: status })
  }
}

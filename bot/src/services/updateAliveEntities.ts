import updateBotStat from "@services/updateBotStat"
import { Group, IGroup, IUser, User } from "common/database"
import { sleep } from "common/utils/sleep"
import { Api, GrammyError } from "grammy"
import { Model } from "mongoose"

const shift = 5000

interface Result {
  id: number
  i: number
  result: boolean | string
  membersQuantity?: number
}

interface ToUpdate {
  id: number
  membersQuantity?: number
}

export default async function updateAliveEntities(
  api: Api,
  botStat: boolean = true
): Promise<void> {
  const reports: Record<string, number> = {}

  await Promise.all([
    updateEntities<IUser>(User, updateUserStatus, true),
    updateEntities<IGroup>(Group, updateGroupStatus, false)
  ])

  await updateBotStat(botStat)

  async function updateEntities<T extends IUser | IGroup>(
    EntityModel: Model<T>,
    updateStatus: (entities: ToUpdate[], status: boolean) => Promise<void>,
    isUsers: boolean
  ): Promise<void> {
    const promises: Promise<Result>[] = []

    let inactiveIds: ToUpdate[] = []
    let activeIds: ToUpdate[] = []

    const entitiesCount: number = await EntityModel.countDocuments()

    for (let y = 0; y <= Math.ceil(entitiesCount / shift); y++) {
      const entities = await EntityModel.find({}, "-_id id", {
        limit: shift,
        skip: y * shift
      })

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i] as IUser | IGroup

        const promise: Promise<Result> = isUsers
          ? api
              .sendChatAction(entity.id, "typing")
              .then((): Result => ({ i, id: entity.id, result: true }))
              .catch(
                (e: GrammyError): Result => ({
                  i,
                  id: entity.id,
                  result: e.description || e.message
                })
              )
          : api
              .getChatMemberCount(entity.id)
              .then(
                (membersQuantity): Result => ({
                  i,
                  id: entity.id,
                  membersQuantity,
                  result: true
                })
              )
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

          const errorIndex = results.findIndex(
            (result) =>
              typeof result.result === "string" &&
              result.result.startsWith("Too Many Requests:")
          )
          const error = results[errorIndex]

          if (error && typeof error.result === "string") {
            await sleep(parseInt(error.result.match(/\d+/)![0], 10) * 1000)

            i = error.i - 1
          } else {
            const success = results.filter(
              (result) => result.result === true
            ).length

            await sleep(success * 6)
          }

          handleResults(results.slice(0, error ? errorIndex : results.length))

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
        const type = isUsers ? "user" : "group"

        if (typeof result.result === "string")
          reports[result.result] = (reports[result.result] || 0) + 1
        else reports[`success.${type}`] = (reports[`success.${type}`] || 0) + 1

        if (result.result === true)
          activeIds.push({
            id: result.id,
            membersQuantity: result.membersQuantity
          })
        else
          inactiveIds.push({
            id: result.id,
            membersQuantity: result.membersQuantity
          })
      })
    }
  }

  async function updateUserStatus(
    entities: ToUpdate[],
    status: boolean
  ): Promise<void> {
    await User.updateMany(
      { id: { $in: entities.map((entity) => entity.id) } },
      { alive: status }
    )
  }

  async function updateGroupStatus(
    entities: ToUpdate[],
    status: boolean
  ): Promise<void> {
    await Promise.all(
      entities.map((entity) =>
        Group.updateOne(
          { id: entity.id },
          { alive: status, membersQuantity: entity.membersQuantity }
        )
      )
    )
  }
}

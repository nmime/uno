import { saveModifier } from "@helpers/saveModifier"
import { GroupContext } from "@typings/context"
import { Group, IGroup } from "common/database"
import { convertChars } from "common/utils"
import { Middleware } from "grammy"

export default (): Middleware<GroupContext> => async (ctx, next) => {
  let group = await Group.findOne({ id: ctx.chat.id })

  if (!group) group = new Group({ id: ctx.chat.id })

  group = Object.assign(group, {
    lastActivity: new Date(),
    title: convertChars(ctx.chat.title),
    username: ctx.chat.type === "supergroup" ? ctx.chat.username : undefined
  } as unknown as IGroup)

  ctx.session.group = group

  await next()

  return saveModifier(group)
}

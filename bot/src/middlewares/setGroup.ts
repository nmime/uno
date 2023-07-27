import { Middleware } from "grammy"

import { Group } from "@database/group"
import { convertChars } from "@helpers/convertChars"
import { GroupContext } from "@typings/context"

export default (): Middleware<GroupContext> => async (ctx, next) => {
  let group = await Group.findOne({ id: ctx.chat.id })

  if (!group) group = new Group({ id: ctx.chat.id })

  group = Object.assign(group, {
    name: convertChars(ctx.chat.title),
    username: ctx.from.username
  })

  ctx.session.group = group

  await next()

  return group.save()
}

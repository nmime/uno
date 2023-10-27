import { GeneralContext } from "@typings/context"
import { Group, User } from "common/database"

export default async function myChatMember(ctx: GeneralContext) {
  const status =
    ctx.myChatMember.new_chat_member.status !== "left" &&
    ctx.myChatMember.new_chat_member.status !== "kicked"

  if (ctx.chat.type === "private")
    return User.updateOne({ id: ctx.from.id }, { alive: status })
  else if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
    await ctx.reply(ctx.t("group"))

    return Group.updateOne({ id: ctx.chat.id }, { alive: status })
  }
}

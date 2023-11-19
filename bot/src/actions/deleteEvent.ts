import { GroupContext } from "@typings/context"

export default async function deleteEvent(ctx: GroupContext) {
  await ctx.deleteMessage().catch(() => {})
}

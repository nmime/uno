import { validate } from "@tma.js/init-data-node"
import config from "@typings/config"
import { User } from "common/database"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function topOfUsers(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")
  try {
    validate(Authorization.split(" ")[1], config.BOT_TOKEN)
  } catch (e) {
    return void res.writeStatus("401").end()
  }

  const by = req.getParameter(0)
  if (!by || !["balance", "won", "lose"].includes(by))
    return void res.writeStatus("400").end()

  const result = await User.find(
    { alive: true },
    { _id: false, balance: true, id: true, name: true, statistics: true }
  )
    .sort({
      [by === "balance" ? "balance" : `statistics.${by}`]: -1
    })
    .limit(15)
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result))
}

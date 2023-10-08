import { HttpRequest, HttpResponse } from "uWebSockets.js"
import { validate } from "@tma.js/init-data-node"
import config from "@typings/config"
import { User } from "common/database"

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
    { balance: true, name: true }
  ).sort({
    [by === "balance" ? "balance" : `statistics.${by}`]: -1
  })
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result))
}

import { matchMaker } from "@colyseus/core"
import config from "@typings/config"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function getGameById(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")
  if (Authorization.split(" ")[1] !== config.SECRET_KEY)
    return void res.writeStatus("401").end()

  const id = req.getParameter(0)
  if (!id) return void res.writeStatus("400").end()

  const result = await matchMaker.driver.findOne({ roomId: id })
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result))
}

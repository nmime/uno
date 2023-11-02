import { findUser } from "@helpers/findUser"
import { validation } from "@helpers/validation"
import { parse } from "@tma.js/init-data-node"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function getUserInfo(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")
  if (!validation(Authorization.split(" ")[1]))
    return void res.writeStatus("401").end()

  const dataOfAuth = parse(Authorization.split(" ")[1])

  const result = await findUser(dataOfAuth.user.id, dataOfAuth.user.firstName)
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result.toJSON()))
}

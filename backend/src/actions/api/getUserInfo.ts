import { findUser } from "@helpers/findUser"
import { parseInitData } from "@tma.js/sdk"
import { validation } from "@utils/validation"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function getUserInfo(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const IPCountry = req.getHeader("cf-ipcountry")
  const Authorization = req.getHeader("authorization")

  if (!validation(Authorization.split(" ")[1]))
    return void res.writeStatus("401").end()

  const dataOfAuth = parseInitData(Authorization.split(" ")[1])

  const result = await findUser(
    dataOfAuth.user.id,
    dataOfAuth.user.firstName,
    IPCountry
  )
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result.toJSON()))
}

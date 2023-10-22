import { collectRequestBody } from "@helpers/collectRequestBody"
import { parse, validate } from "@tma.js/init-data-node"
import config from "@typings/config"
import { AdView } from "common/database/adView"
import { AdInfo } from "common/typings/yandex"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function receiveReward(
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

  const dataOfAuth = parse(Authorization.split(" ")[1])

  let body: AdInfo
  try {
    const requestBody = await collectRequestBody(res)
    body = JSON.parse(requestBody) as AdInfo

    if (!body || !body.advData.length) return void res.writeStatus("400").end()
  } catch (e) {
    return void res.writeStatus("400").end()
  }

  const result = await AdView.findOne({
    eventHash: body.advData[0].eventHash,
    userId: dataOfAuth.user.id
  })
  if (result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(String(config.AD_REWARD))

  return void AdView.create({
    adId: body.advData[0].adId,
    eventHash: body.advData[0].eventHash,
    lang: body.lang,
    reward: config.AD_REWARD,
    userId: dataOfAuth.user.id
  })
}

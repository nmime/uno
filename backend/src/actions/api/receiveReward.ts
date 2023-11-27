import { parseInitData } from "@tma.js/sdk"
import config from "@typings/config"
import { collectRequestBody } from "@utils/collectRequestBody"
import { validation } from "@utils/validation"
import { AdView, User } from "common/database"
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
  if (!validation(Authorization.split(" ")[1]))
    return void res.writeStatus("401").end()

  const dataOfAuth = parseInitData(Authorization.split(" ")[1])

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

  const now = new Date(),
    today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      0,
      0,
      0,
      0
    )
  const viewsToday = await AdView.countDocuments({
    createdAt: today,
    userId: dataOfAuth.user.id
  })
  if (viewsToday >= config.AD_PER_DAY) return void res.writeStatus("407").end()

  if (!res.aborted) res.writeStatus("200").end(String(config.AD_REWARD))

  return void Promise.all([
    AdView.create({
      adId: body.advData[0].adId,
      createdAt: new Date(),
      eventHash: body.advData[0].eventHash,
      lang: body.lang,
      reward: config.AD_REWARD,
      userId: dataOfAuth.user.id
    }),
    User.updateOne(
      {
        id: dataOfAuth.user.id
      },
      {
        $inc: { balance: config.AD_REWARD }
      }
    )
  ])
}

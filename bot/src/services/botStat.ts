import config from "@typings/config"
import axios from "axios"
import { User } from "common/database"
import FormData from "form-data"

import configJson from "../../config.json"

type Find = {
  alive?: boolean
}

export default async function botStatUpdate(): Promise<void> {
  if (!configJson.botStat.send && !configJson.botStat.botMan) return

  const find = {} as Find
  if (configJson.botStat.alive) find.alive = true

  const users = await User.find(find, "-_id id").lean()
  const content = users
    .map((value) => Object.values(value).join(";"))
    .join("\n")

  const formData = new FormData()
  formData.append("file", Buffer.from(content, "utf8"))

  if (configJson.botStat.send && configJson.botStat.key) {
    const axiosConfig = {
      data: formData,
      headers: {
        ...formData.getHeaders()
      },
      method: "post",
      url: `https://api.botstat.io/create/${config.BOT_TOKEN}/${configJson.botStat.key}?notify_id=${config.ADMINS[0]}`
    }

    try {
      await axios(axiosConfig)
    } catch (error) {
      console.error(error)
    }
  }

  if (configJson.botStat.botMan) {
    const axiosConfig = {
      data: formData,
      headers: {
        ...formData.getHeaders()
      },
      method: "post",
      url: `https://api.botstat.io/botman/${config.BOT_TOKEN}?owner_id=${config.ADMINS[0]}`
    }

    try {
      await axios(axiosConfig)
    } catch (error) {
      console.error(error)
    }
  }
}

import { validate } from "@tma.js/init-data-node"
import config from "@typings/config"
import { MyRoom } from "@typings/room"
import { Client, ServerError } from "colyseus"
import { ConnectOptions, Player } from "common"

export default function onAuth(
  this: MyRoom,
  client: Client,
  options: ConnectOptions
) {
  if (
    !options ||
    !options.player ||
    !options.initDataRaw ||
    typeof options.player.id !== "number" ||
    typeof options.player.name !== "string" ||
    typeof options.player.language !== "string" ||
    typeof options.initDataRaw !== "string"
  )
    return new ServerError(4001)

  try {
    validate(options.initDataRaw, config.BOT_TOKEN)
  } catch (e) {
    return new ServerError(401)
  }

  client.userData = {
    id: options.player.id,
    language: options.player.language,
    name: options.player.name
  } as Player

  return true
}

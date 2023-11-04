import { validation } from "@helpers/validation"
import { parse } from "@tma.js/init-data-node"
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

  if (this.state.visitors.size >= 10) return new ServerError(4002)

  if (!validation(options.initDataRaw)) return new ServerError(401)

  const dataOfAuth = parse(options.initDataRaw)
  if (dataOfAuth.user.id !== options.player.id) return new ServerError(400)

  client.userData = {
    id: options.player.id,
    language: options.player.language,
    name: options.player.name
  } as Player

  return true
}

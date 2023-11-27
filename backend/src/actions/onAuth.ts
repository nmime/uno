import { parseInitData } from "@tma.js/sdk"
import { MyRoom } from "@typings/room"
import { validation } from "@utils/validation"
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
    typeof options.initDataRaw !== "string"
  )
    throw new ServerError(4001)

  if (this.state.visitors.size >= this.state.maxPlayers)
    throw new ServerError(4002)

  if (!validation(options.initDataRaw)) throw new ServerError(401)

  const dataOfAuth = parseInitData(options.initDataRaw)
  if (dataOfAuth.user.id !== options.player.id) throw new ServerError(400)

  client.userData = {
    id: options.player.id,
    name: options.player.name,
    sessionId: client.sessionId
  } as Player

  return true
}

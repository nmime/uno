import { Client } from "colyseus"
import { Player } from "common"
import http from "http"
import { MyRoom } from "@typings/room"

export default function onAuth(
  this: MyRoom,
  client: Client,
  options: Player,
  request: http.IncomingMessage
) {
  if (!options.id || !options.name) return

  client.userData = {
    id: options.id,
    language: options.language,
    name: options.name
  } as Player

  return options
}

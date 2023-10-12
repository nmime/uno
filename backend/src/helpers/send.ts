import { MyRoom } from "@typings/room"
import { Client } from "colyseus"
import {
  CardColorsDefault,
  CardData,
  GameErrors,
  GameEvents,
  MessageInput,
  Player
} from "common"

export function sendError(client: Client<Player>, reason: GameErrors) {
  if (!client) return

  return client.send("game", {
    ok: false,
    type: reason
  } as MessageInput)
}

interface propsSendMessage {
  card?: CardData
  color?: CardColorsDefault
}

export function sendMessage(
  client: Client<Player>,
  reason: GameEvents,
  { card, color }: propsSendMessage
) {
  if (!client) return

  return client.send(
    "game",
    JSON.parse(
      JSON.stringify({
        card,
        color,
        ok: true,
        type: reason
      } as MessageInput)
    )
  )
}

interface propsBroadcast {
  playerFrom?: string
  playerTo?: string
  card?: CardData
}

export function broadcast(
  room: MyRoom,
  reason: GameEvents,
  { card, playerFrom, playerTo }: propsBroadcast
): void {
  room.broadcast(
    "game",
    JSON.parse(
      JSON.stringify({
        card,
        ok: true,
        playerFrom,
        playerTo,
        type: reason
      } as MessageInput)
    )
  )
}

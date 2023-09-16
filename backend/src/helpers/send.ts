import {
  CardColorsDefault,
  CardData,
  GameErrors,
  GameEvents,
  MessageInput,
  Player
} from "common"
import { Client } from "colyseus"
import { MyRoom } from "@typings/room"

export function sendError(client: Client<Player>, reason: GameErrors) {
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
  return client.send("game", {
    card,
    color,
    ok: true,
    type: reason
  } as MessageInput)
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
  room.broadcast("game", {
    card,
    ok: true,
    playerFrom,
    playerTo,
    type: reason
  } as MessageInput)
}

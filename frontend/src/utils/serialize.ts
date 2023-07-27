import { Game } from "@contexts/Game"
import { PlayerDataClass } from "common"

export function serialize(object: Game): Game {
  object.players = new Map<string, PlayerDataClass>(
    Object.entries(object.players)
  )

  return object
}

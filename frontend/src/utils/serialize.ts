import { Game } from "@typings/game"
import { MyState, PlayerClass, PlayerDataClass } from "common"

export function serialize(state: MyState, gameState: Game) {
  const unorderedPlayers = gameState.players

  const orderedPlayers: Map<string, PlayerDataClass> = new Map<
    string,
    PlayerDataClass
  >()
  for (const key of Array.from(state.players.keys())) {
    // @ts-ignore
    orderedPlayers.set(key, unorderedPlayers[key])
  }

  gameState.players = orderedPlayers

  const unorderedVisitors = gameState.visitors

  const orderedVisitors: Map<string, PlayerClass> = new Map<
    string,
    PlayerClass
  >()
  for (const key of Array.from(state.visitors.keys())) {
    // @ts-ignore
    orderedVisitors.set(key, unorderedVisitors[key])
  }

  gameState.visitors = orderedVisitors
}

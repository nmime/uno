import timer from "@actions/timer"
import config from "@typings/config"
import { MyRoom } from "@typings/room"
import { GameEvents } from "common"

export function setTimer(room: MyRoom, actor: number, state: GameEvents): void {
  room.clock.clear()

  if (config.NODE_ENV === "development") return

  room.state.timer = Date.now() + room.state.maxRoundDuration

  room.clock.setTimeout(timer, room.state.maxRoundDuration, room, actor, state)
}

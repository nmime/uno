import timer from "@actions/timer"
import { MyRoom } from "@typings/room"
import { GameEvents } from "common"

export function setTimer(room: MyRoom, actor: number, state: GameEvents): void {
  room.clock.clear()

  room.state.timer = Date.now() + room.state.maxRoundDuration

  room.clock.setTimeout(timer, room.state.maxRoundDuration, room, actor, state)
}

import { MyRoom } from "@typings/room"

export function clearTimer(room: MyRoom): void {
  room.clock.clear()

  room.state.timer = undefined
}

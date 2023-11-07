import { endGame } from "@helpers/endGame"
import { MyRoom } from "@typings/room"

export default function onDispose(this: MyRoom) {
  if (this.state.status === "playing") return endGame(this)
}

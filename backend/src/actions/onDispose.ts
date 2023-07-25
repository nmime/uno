import { MyRoom } from "@typings/room"

export default function onDispose(this: MyRoom) {
  console.log("dispose", this.roomId)
}

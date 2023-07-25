import {Game} from "common"

export default function onStateChange(state: Game) {
  console.log(state.toJSON())
}

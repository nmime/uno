import { Room } from "colyseus"
import { MyState } from "common"

import onCreate from "@actions/onCreate"
import onAuth from "@actions/onAuth"
import onJoin from "@actions/onJoin"
import onLeave from "@actions/onLeave"
import onDispose from "@actions/onDispose"

export class MyRoom extends Room<MyState> {
  onCreate = onCreate
  onAuth = onAuth
  onJoin = onJoin
  onLeave = onLeave
  onDispose = onDispose
}

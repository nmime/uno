import onAuth from "@actions/onAuth"
import onCreate from "@actions/onCreate"
import onDispose from "@actions/onDispose"
import onJoin from "@actions/onJoin"
import onLeave from "@actions/onLeave"
import { Room } from "colyseus"
import { Metadata, MyState } from "common"

export class MyRoom extends Room<MyState, Metadata> {
  onCreate = onCreate
  onAuth = onAuth
  onJoin = onJoin
  onLeave = onLeave
  onDispose = onDispose
}

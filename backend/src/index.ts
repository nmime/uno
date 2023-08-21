import config from "@typings/config"

import { connect } from "mongoose"

import { Server } from "@colyseus/core"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import { RedisDriver } from "colyseus"

import { MyRoom } from "@typings/room"

const transport = new uWebSocketsTransport({
  idleTimeout: 60,
  sendPingsAutomatically: true
})
const gameServer = new Server({
  driver: new RedisDriver({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  transport: transport
})

gameServer.define("game", MyRoom)

process.on("unhandledRejection", (e) =>
  console.error("unhandledRejection...", e)
)

gameServer
  .listen(config.PORT)
  .then(() =>
    console.log(`BACKEND successful started, listening on ${config.PORT}`)
  )
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

connect(config.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err))
